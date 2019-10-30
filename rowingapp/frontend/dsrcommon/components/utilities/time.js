
function timeCtrl() {
  this.hmstyle={
    'white-space': "nowrap"
  };

  function pad(n) {
    if ((""+n).length==1) return "0"+n;
    return ""+n;
  }

  this.$onInit=function() {
    if (this.ngModel && this.ngModel.hour!=null) {
      if (this.ngModel.hour<10) {
        this.ngModel.hour="0"+this.ngModel.hour;
      }
      if (this.ngModel.minute<10) {
        this.ngModel.minute="0"+this.ngModel.minute;
      }
    }
  }
  // this.$doCheck=function() {
  //   if (this.ngModel && this.ngModel.hour) {
  //     // console.log("XXchan "+ 1*this.hours+":"+1*this.minutes+" => " + h+":"+m);
  //     if ((1*this.hours!=h || 1*this.minutes!=m)) {
  //       console.log("chan "+ 1*this.ngModel.hour+":"+1*this.ngModel.minute);
  //       this.ngModel.hour=(this.ngModel.hour<10?"0":"")+this.ngModel.hour;
  //       this.ngModel.minute=(this.ngModel.minute<10?"0":"")+this.ngModel.time.getMinutes();
  //     }
  //   } else {
  //     this.hours="";
  //   }
  // }
  this.ddstyle={
    maxwidth: "2em"
  };
  this.updateHours = function() {
    if (isNaN(this.ngModel.hour) || this.ngModel.hour.length>2) {
      this.ngModel.hour="";
    }
    if (this.ngModel.hour<0) {
      this.ngModel.hour="00";
    } else if (this.ngModel.hour>23) {
      this.ngModel.hour=23;
    }
    this.onUpdate();
  };

  this.setHours = function() {
    this.fixdate();
  }
  
  this.setMinutes = function() {
    if (!this.ngModel.minute) {
      this.ngModel.minute="00";
    } else if (this.ngModel.minute.length==1) {
      this.ngModel.minute="0"+this.ngModel.minute;
    }
    this.onUpdate();
    this.fixdate();
  }

  this.initEnd = function() {
    if (this.ngModel.hour!=null) {
      return;
    }
    now = new Date();
    this.ngModel.year=now.getFullYear();
    this.ngModel.month=pad(now.getMonth()+1);
    this.ngModel.day=pad(now.getDate());
    this.ngModel.hour=pad(now.getHours());
    this.ngModel.minute=pad(now.getMinutes());
  }
  
  this.updateMinutes = function() {
    if (isNaN(this.ngModel.minute) || !this.ngModel.minute || this.ngModel.minute.length>2) {
      this.ngModel.minute="";
      //this.ngModel.time=null;
    }
    if (this.ngModel.minute<0) {
      this.ngModel.minute="00";
    } else if (this.ngModel.minute>59) {
      this.ngModel.minutes="59";
    }
    this.onUpdate();
  }
}

angular.module('dsrcommon.utilities.dsrtime',[]).
  component('dsrtime',{
    replace:true,
    template:
    '<span ng-style="$ctrl.hmstyle"><input  type="text" style="max-width:2em;" pattern="(1[0-3])|([0-1][0-9])?" size="2" ng-focus="$ctrl.initEnd()" ng-model="$ctrl.ngModel.hour" ng-blur="$ctrl.setHours()" ng-change="$ctrl.updateHours()">:<input type="text" style="max-width:2em;" size="2" pattern="[0-9][0-9]?" ng-model="$ctrl.ngModel.minute" ng-change="$ctrl.updateMinutes()" ng-blur="$ctrl.setMinutes()"></span>',
    bindings: {
      ngModel: "=",
      fixdate: '&',
      onUpdate: '&',
    },
    controller: timeCtrl
  }
);