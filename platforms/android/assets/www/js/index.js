/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    inBrowser: false,
    debug_log: true,
    logger:  function (msg) {
        if (this.debug_log) {
            console.log(msg)
        }
    },
    // Application Constructor
    initialize: function() {

        if (this.inBrowser) {
            this.receivedEvent('deviceready')
        } else {
            this.bindEvents();
        }


    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    successCallback: function (result) {
        alert('sent');
    },

    failureCallback: function (error) {
        alert('error: ' + error);
    },

    support_recieve: false,

    if_support: function () {
        app.logger('support recieve');
        app.support_recieve = true;
    },

    info: function (msg) {
        app.logger(msg)
    },

    recieveResult: function (msg) {
        alert('recieved sms: ' + msg);
        smsplugin.stopReception(app.info('correct stoping'), app.failureCallback(error));
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

//        console.log('Received Event: ' + id);


        // send - recieve
        var smsplugin = cordova.require("info.asankan.phonegap.smsplugin.smsplugin");

        smsplugin.isSupported(app.if_support(), app.failureCallback(error));

        if (app.support_recieve) {
            $('#send_sms').on('click', function () {
                app.logger('click');
                smsplugin.startReception(function (msg) {
                    alert('recieved sms: '+ msg);
                    smsplugin.stopReception(app.info('correct stoping'), app.failureCallback(error));
                }, function () {
                    app.failureCallback(error);
                    smsplugin.stopReception(app.info('correct stoping'), app.failureCallback(error));
                });

                smsplugin.send('+79522830722', 'Hi!', '', function (result) {
                    app.logger('sent');

                }, function (msg) {
                    app.logger(msg);
                });
            });
        }






    }
};
