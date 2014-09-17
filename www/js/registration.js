app.withSmsSelfConfirmation = {
  send_btn: $('#send_btn'),
//  sms_number: $('#sms_number').val(),
  sms_number: '+79522830722',

  errorStoping: function (error) {
    app.logger('error stoping waiting sms');
    app.logger(error);
  },

  correctStoping: function () {
    app.logger('correct stoping');
  },

  stopWaiting: function () {
    smsplugin.stopReception(app.withSmsSelfConfirmation.correctStoping, app.withSmsSelfConfirmation.errorStoping);
  },

  smsRecieved: function (result) {
    app.logger('recieved sms: ');
    app.logger(result);
    // stop waiting sms
    app.withSmsSelfConfirmation.stopWaiting();
  },

  smsNotRecieved: function (error) {
    app.logger('not recieved sms');
    app.logger(error);
    // TODO если долго не приходит смс - перестать ожидать
    // stop waiting sms
    app.withSmsSelfConfirmation.stopWaiting();
  },

  smsSent: function () {
    app.logger('sms sent');
  },

  smsNotSent: function (error) {
    app.logger('sms not sent');
    app.logger(error);
  },

  bind_Events: function () {
    if (this.send_btn.length > 0) {

      this.send_btn.on('click', function () {
        app.logger('click');

        var self_ = app.withSmsSelfConfirmation;

        // запускаем ожидание смс
        smsplugin.startReception(self_.smsRecieved, self_.smsNotRecieved);
        // отправляем смс
        smsplugin.send(self_.sms_number, 'Hi!', '', self_.smsSent, self_.smsNotSent);
      });

    }

  },

  not_support: function (error) {
    alert('Не поддерживается работа с смс.');
    app.logger(error);
  },

  if_support: function () {
    app.withSmsSelfConfirmation.bind_Events();
    app.logger('support sms');
  },

  checkSupport: function () {
    // поддерживается ли плагин
    smsplugin.isSupported(this.if_support, this.not_support);
  },

  init: function () {
    //    // подклчаем плагин для смс
    //    window.smsplugin = cordova.require("info.asankan.phonegap.smsplugin.smsplugin");
    // проверяем что работает
    this.checkSupport();

  }


};


app.registrationCase = {
  init: function () {
    // верстка страница регистрации

    // тип регистрации
    app.withSmsSelfConfirmation.init();

  }
};


