(self.webpackChunk=self.webpackChunk||[]).push([[891],{2891:(r,e,n)=>{"use strict";n.r(e),n.d(e,{ajaxify:()=>i,ajaxifyFormOnModal:()=>s,ajaxifyDynamicFormOnModal:()=>a});var t=[],o=function(r,e){var n={group:"form-group",groupError:"has-error",inputError:"is-invalid",helpBlock:"help-block",invalidHelpBlock:["invalid-feedback","d-block"]},t=this;this.$form=r,t.errors=null,this.setErrors=function(r){return t.errors=r,this};var o=function(){return t.errors?t.errors:(console.warn("you have to pass the validation errors first"),{})};this.appendFormErrors=function(){return t.clearErrors(),e.each(o(),(function(r,e){var o=t.$form.find('[name="'+r+'"]');o.parents("."+n.group).addClass(n.groupError).append(i(e)),o.addClass(n.inputError)})),this},this.clearErrors=function(){return r.find("."+n.group).each((function(r,t){e(this).removeClass(n.groupError).find("."+n.invalidHelpBlock[0]).remove(),e(this).find("."+n.inputError).removeClass(n.inputError)})),this};var i=function(r){return Array.isArray(r)&&(r=r[0]),'<p class="'+n.invalidHelpBlock.join(" ")+'">'+r+"</p>"};return this.getErrorsAsText=function(){var r="";return e.each(o(),(function(e,n){r+='<div data-input="'+e+'">'+n+"</div>"})),r},this},i=function(r){if(t[r])return t[r];if(this.$form=$(r),!this.$form.length)return console.error('"ajaxifyForm" --\x3e NO VALID SELECTOR'),!1;var e=this;this.form=r,this.$form=$(r),this.id=$(r).attr("id"),this._callback=null,this.errorsObj=null,this.spinnerId="formSpinner_"+jsHelper.uuid();var n=function(){$(e.form).off("submit.ajaxify")};n(),this.onSubmit=function(r){"function"==typeof r&&(e._callback=r)},$(e.form).on("submit.ajaxify",(function(r,n){if(r.preventDefault(),!e.$form.hasClass("submitting")){e.$form.addClass("submitting"),e.$form.prepend(s()),$("#"+e.spinnerId).fadeIn();var t=i(this);"function"==typeof e._callback&&e._callback(e,t)}}));var i=function(r){var n=new FormData(r);return $.ajax({method:r.method,processData:!1,cache:!1,contentType:!1,url:r.action,data:n,dataType:"json"}).fail((function(r){console.log(r);var n=r.statusText+"  Error Code: "+r.status;r.responseJSON&&(e.errorsObj=new o(e.$form,$).setErrors(r.responseJSON.errors),e.errorsObj.appendFormErrors(),n=e.errorsObj.getErrorsAsText()||r.responseJSON.message||n),l({title:"Oups...!",text:n,icon:"error"})})).always((function(){e.$form.removeClass("submitting"),$("#"+e.spinnerId).remove()}))};this.clearInputs=function(){return e.$form.trigger("reset"),e},this.destroy=function(){n(),delete t[e.form]};var s=function(){return'<div id="'+e.spinnerId+'" class="spinnerWrapper position-absolute d-flex justify-content-center align-items-center" style="top: 0;bottom: 0;right: 0;left: 0; background:#0000001c; z-index: 9999; display: none">    <i class="fas fa-spinner fa-pulse fa-4x"></i></div>'};return t[e.form]=e,e},s=function(r,e,n){var t=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if($(r).length&&$(e).length){var o=new i(r);$(e).on("hide.bs.modal",(function(r){o.clearInputs(),t&&o.destroy(),o.errorsObj&&o.errorsObj.clearErrors()})),o.onSubmit((function(r,t){t.done((function(t){r.clearInputs(),l({title:t.msg.title,text:t.msg.msg,icon:"success"}),$(e).modal("hide"),window.BaseAdmin.ajaxLoadWrappers(n)}))}))}else console.error({modalSelector:e,formSelector:r})},a=function(r,e,n,t){$(document).on("click",r,(function(r){var o=$(n),i=$(this);$.getJSON(i.data("url"),(function(r){var i=r.extraValues.formRendered;o.find(".modal-body").html(i),BaseAdmin.triggerAjaxLoadEvent(o.get(0)),o.modal("show"),BaseAdmin.forms.ajaxifyFormOnModal(e,n,t,!0)}))}))},l=function(r){n.e(455).then(n.t.bind(n,6455,23)).then((function(e){e.default.fire({title:r.title,html:r.text,timer:1500,icon:r.icon,timerProgressBar:!0})}))}}}]);