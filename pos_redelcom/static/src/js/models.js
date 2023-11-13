/*
 * Copyright (C) 2023 Konos and MercadoPago S.A.
 * Licensed under the GPL-3.0 License or later.
 */

odoo.define("pos_redelcom.models", function(require) {
    "use strict";
    var models = require("point_of_sale.models");
    var PaymentRedelcom = require("pos_redelcom.payment");
    models.register_payment_method("redelcom", PaymentRedelcom);
});
