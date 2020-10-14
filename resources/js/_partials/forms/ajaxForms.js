window.BaseAdmin = window.BaseAdmin || {};
window.BaseAdmin.forms = window.BaseAdmin.forms || {};
BaseAdmin.forms.ajaxified = window.BaseAdmin.ajaxified || {};


BaseAdmin.forms.errors = function ($form) {

    const classes = {
        group: "form-group",
        groupError: "has-error",
        inputError: "is-invalid",
        helpBlock: "help-block",
        invalidHelpBlock: ["invalid-feedback", "d-block"],
    };


    const _self = this;
    this.$form = $form;
    _self.errors = null;

    this.setErrors = function (ajaxErrors) {
        _self.errors = ajaxErrors;
        return this
    };
    let getErrors = function () {
        if (_self.errors) {
            return _self.errors;
        }
        console.warn('you have to pass the validation errors first');
        return {};
    };

    this.appendFormErrors = function () {
        _self.clearErrors();
        $.each(getErrors(), function (field, txt) {
            let $input = _self.$form.find('[name="' + field + '"]');
            let $parent = $input.parents("." + classes.group);
            $parent.addClass(classes.groupError).append(getHelpText(txt));
            $input.addClass(classes.inputError)
        });
        return this;
    };

    this.clearErrors = function () {
        $form.find("." + classes.group).each(function (i, el) {
            $(this).removeClass(classes.groupError).find("." + classes.invalidHelpBlock[0]).remove();
            $(this).find('.' + classes.inputError).removeClass(classes.inputError)
            // $(this).removeClass(classes.groupError).find("." + classes.helpBlock).remove();
        });
        return this;
    };

    let getHelpText = function (text) {
        if (Array.isArray(text)) {
            text = text[0];
        }
        return '<p class="' + classes.invalidHelpBlock.join(' ') + '">' + text + '</p>';
    };

    this.getErrorsAsText = function () {
        let text = "";
        $.each(getErrors(), function (i, txt) {
            text += '<div data-input="' + i + '">' + txt + '</div>';
        });
        return text;
    };
    return this;
};

/**
 * Display the specified resource.
 *
 * @param   formSelector
 * @return AjaxObj
 */
BaseAdmin.forms.ajaxify = function (formSelector) {
    if (!(this instanceof BaseAdmin.forms.ajaxify)) return new BaseAdmin.forms.ajaxify(name);
    if (BaseAdmin.forms.ajaxified && BaseAdmin.forms.ajaxified[formSelector]) {
        return BaseAdmin.forms.ajaxified[formSelector];
    }
    this.$form = $(formSelector);
    if (!this.$form.length) {
        console.error('"ajaxifyForm" --> NO VALID SELECTOR');
        return false;
    }
    const _self = this;
    this.form = formSelector;
    this.$form = $(formSelector);
    this.id = $(formSelector).attr('id');
    this._callback = null;
    this.errorsObj = null;
    this.spinnerId = 'formSpinner_' + BaseAdmin.uuid();

    let destroyListeners = function () {
        $(_self.form).off("submit.ajaxify");
    };
    destroyListeners();

    this.onSubmit = function (callback) {
        if (typeof callback === 'function') {
            _self._callback = callback
        }
    };

    $(_self.form).on("submit.ajaxify", function (event, j) {
        event.preventDefault();
        if (_self.$form.hasClass('submitting')) {
            return;
        }
        _self.$form.addClass('submitting');

        _self.$form.prepend(getSpinnerWrapper());
        $('#' + _self.spinnerId).fadeIn();

        let jqxhr = ajaxRequest(this);
        if (typeof _self._callback === 'function') {
            _self._callback(_self, jqxhr);
        }
    });


    let ajaxRequest = function (fm) {
        let data = new FormData(fm);
        return $.ajax({
            method: fm.method,
            //   enctype: 'multipart/form-data',
            processData: false,  // Important!
            cache: false,
            contentType: false,
            url: fm.action,
            data: data,
            dataType: "json",
        }).fail(function (data) {
            console.log(data);
            //  console.log(data);
            let text = data.statusText + '<br>  Error Code: ' + data.status;
            if (data.responseJSON) {
                _self.errorsObj = new BaseAdmin.forms.errors(_self.$form).setErrors(data.responseJSON.errors);
                _self.errorsObj.appendFormErrors();
                text = _self.errorsObj.getErrorsAsText() || data.responseJSON.message || text;
            }

            Swal.fire({
                title: 'Oups...!',
                text: text,
                icon: 'error',
            })

        }).always(function () {
            _self.$form.removeClass('submitting');
            $('#' + _self.spinnerId).remove();
        });


    };
    this.clearInputs = function () {
        _self.$form.trigger("reset");
        return _self;
    };
    this.destroy = function () {
        destroyListeners();
        delete window.BaseAdmin.forms.ajaxified[_self.form];
    };
    let getSpinnerWrapper = () => {
        return '<div id="' + _self.spinnerId + '" class="spinnerWrapper position-absolute d-flex justify-content-center align-items-center" ' +
            'style="top: 0;bottom: 0;right: 0;left: 0; background:#0000001c; z-index: 9999; display: none">' +
            '    <i class="fa fa-spinner fa-pulse fa-4x"></i>' +
            '</div>'
    };

    window.BaseAdmin.forms.ajaxified[_self.form] = _self;
    return _self;
};


BaseAdmin.forms.ajaxifyFormOnModal = function (formSelector, modalSelector, wrapperToReload, destroyOnClose = false) {

    if (!$(formSelector).length || !$(modalSelector).length) {
        return;
    }
    let form = new BaseAdmin.forms.ajaxify(formSelector);
    $(modalSelector).on('hide.bs.modal', function (e) {
        form.clearInputs();
        if (destroyOnClose) {
            form.destroy();
        }

        if (form.errorsObj) {
            form.errorsObj.clearErrors();
        }
    });

    form.onSubmit(function (instance, jqxhr) {
        jqxhr.done(function (data) {
            // BaseAdminDebugMsg(formSelector, instance, 'ajaxifyForm taskForm');
            instance.clearInputs();
            Swal.fire({
                title: data.msg.title,
                text: data.msg.msg,
                icon: 'success',
            })
            $(modalSelector).modal('hide');
            BaseAdminajaxLoadWrappers(wrapperToReload);
        });
    });
};


/*
*  E X A M P L E
*
    <script defer data-comment="newPostAjax">

     new BaseAdmin.forms.ajaxify("form#newPostForm").onSubmit(function (instance, jqxhr) {
         jqxhr.done(function (data) {
             BaseAdminDebugMsg('form#newPostForm', instance, 'ajaxifyForm newPostForm');
             instance.clearInputs();
             Swal.fire('{{  __('message.success_title') }}',data.responseText);
             $('.js-listWrapper').load(location.href + ' .js-listWrapper  > *', function (response) {
                 let paginator = '.js-paginator';
                 $(paginator).html($(response).find(paginator).html());
                 $lastLink = $(paginator).find('.js-lastPage__link');
                 if ($lastLink.length) {
                     $lastLink.click();
                 }
             });
         });
     });
    </script>
*
*
* */
