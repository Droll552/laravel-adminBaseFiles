(self.webpackChunk=self.webpackChunk||[]).push([[52],{4052:(t,n,i)=>{"use strict";var s;i.r(n),i.d(n,{init:()=>h});var e=new Map,u='[data-toggle="timePicker"]',h=function(){i.e(2).then(i.t.bind(i,4002,23)).then((function(t){(s=t.default)(document).on("focusin","".concat(u," input"),(function(t){new r(this)}))}))},r=function(t){var n=this,i=this;this.$wrapper=s(t).is(u)?s(t):s(t).parents(u),this.$hiddenInput=this.$wrapper.find('[type="hidden"]');var h=this.$hiddenInput.get(0);if(!e.has(h)){e.set(h,i),this.$hoursInput=i.$wrapper.find("input").not("[type=hidden]").first(),this.$minutesInput=i.$wrapper.find("input").not("[type=hidden]").last(),s(this.$hiddenInput).off("change.formFields"),s(this.$hoursInput).off("change.formFields"),s(this.$minutesInput).off("change.formFields"),this.totalMinutes=0,this.minutes=0,this.hours=0;var r=function(){var t=parseInt(i.$hiddenInput.val())||0;n.minutes=t%60,n.hours=Math.floor(t/60),i.$hoursInput.val(n.hours),i.$minutesInput.val(n.minutes)};this.getTimeForHumans=function(){return("0"+this.getHours()).slice(-2)+":"+("0"+this.getMinutes()).slice(-2)},this.getMinutes=function(){return n.minutes},this.getHours=function(){return n.hours},this.getTimeToMinutes=function(){return 60*n.hours+n.minutes},s(this.$hoursInput).on("change.formFields",(function(t){i.hours=parseInt(s(this).val()),i.$hiddenInput.val(i.getTimeToMinutes())})),s(this.$minutesInput).on("change.formFields",(function(t){var n=parseInt(s(this).val()),e=n;if(n>59){var u=Math.floor(n/60);i.hours+=u,e%=Math.abs(n)||0}if(-1===n&&(i.hours>0&&i.hours--,e=59),n<-1){n=Math.abs(n);var h=Math.floor(n/60);i.hours-=h,i.hours<0&&(i.hours=0),e=n%60}i.minutes=e,i.$hiddenInput.val(i.getTimeToMinutes()),i.$minutesInput.val(i.minutes),i.$hoursInput.val(i.getHours())})),s(this.$hiddenInput).on("change.formFields",(function(t){r()})),r()}}}}]);