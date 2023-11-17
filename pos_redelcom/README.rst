==============
POS Redelcom
==============

Integrate your POS with a Redelcom payment terminal.


Configuration
-------------

First, go to **Point of Sale > Configuration > Payment Methods** and create a new
payment method.

.. image:: https://raw.githubusercontent.com/KonosCL/odoo-apps/16.0/pos_redelcom/static/description/image_01.png
   :alt: image_01
   :width: 600px

If the values provided are correct, the *Redelcom Terminal Code* field will be
filled automatically when saving the changes.

Finally, go to **Point of Sale > Configuration > Settings** and enable the new payment
method at each point of sale where it will be used.

.. image:: https://raw.githubusercontent.com/KonosCL/odoo-apps/16.0/pos_redelcom/static/description/image_02.png
   :alt: image_02
   :width: 600px


Usage
-----

By clicking on the payment method, we will have a button available that will allow us to
send the transaction to the Redelcom payment terminal.

.. image:: https://raw.githubusercontent.com/KonosCL/odoo-apps/16.0/pos_redelcom/static/description/image_03.png
   :alt: image_03
   :width: 600px


Known issues
------------

Just for the record, this module was tested with the Redelcom A910 payment terminal.
