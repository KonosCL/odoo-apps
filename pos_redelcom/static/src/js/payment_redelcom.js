/*
 * Copyright (C) 2023 Konos and MercadoPago S.A.
 * Licensed under the GPL-3.0 License or later.
 */

odoo.define("pos_redelcom.payment", function(require) {
    "use strict";
    const core = require("web.core");
    const rpc = require("web.rpc");
    const PaymentInterface = require("point_of_sale.PaymentInterface");
    const { Gui } = require('point_of_sale.Gui');
    const _t = core._t;

    var PaymentRedelcom = PaymentInterface.extend({
        _redelcomFetchPaymentIntent: async function (payment_method, pos_ref, name, amount) {
            try {
                let data = await rpc.query({
                    model: "pos.payment.method",
                    method: "redelcom_make_payment",
                    args: [[payment_method.id], pos_ref, name, amount],
                }, {
                    silent: true,
                });
                return data;
            } catch (error) {
                let message;
                if (error.message.code === 200) {
                    message = error.message.data.message;
                } else {
                    message = error.message.message;
                }
                this._showError(message);
                return false;
            };
        },
        _redelcomMakePayment: async function () {
            let line = this.pos.get_order().selected_paymentline;
            let payment_intent = await this._redelcomFetchPaymentIntent(
                line.payment_method, line.order.uid,
                line.order.name, line.amount);
            if (!payment_intent) {
                line.set_payment_status("retry");
                return false;
            }
            if (payment_intent.state == "RECHAZADO") {
                line.set_payment_status("retry");
                this._showError(payment_intent.message);
                return false;
            }
            line.transaction_id = payment_intent.transaction_id;
            line.card_type = payment_intent.card_type;
            line.set_payment_status("done");
            return true;
        },
        send_payment_request: async function (cid) {
            await this._super.apply(this, arguments);
            var line = this.pos.get_order().selected_paymentline;
            line.set_payment_status("waiting");
            try {
                return await this._redelcomMakePayment();
            } catch (error) {
                this._showError(error);
                return false;
            }
        },
        send_payment_cancel: function (order, cid) {
            this._super.apply(this, arguments);
            return Promise.resolve();
        },
        _showError: function (msg, title) {
            if (!title) {
                title =  _t("Redelcom terminal error");
            }
            Gui.showPopup("ErrorPopup",{
                "title": title,
                "body": msg,
            });
        },
    });
    return PaymentRedelcom;
});
