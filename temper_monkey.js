// ==UserScript==
// @name         sprintax-autofiller
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  fix sprintax!
// @author       Zinan Guo
// @match        https://taxprep.sprintax.com/ots/1099b-forms-2022.html*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sprintax.com
// @grant        GM_log
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    const data = "REPLACE WITH YOUR DATA"

    $(document).ready(function() {
        var url = window.location.href;
        var formNum = parseInt(url.split("=")[1]);
        var formData = data[formNum-1]
        document.getElementById("__employer_details_employer_name").value = formData["PAYER NAME"]
        document.getElementById("__employer_details_employer_address").value = formData["PAYER ADDR"]
        document.getElementById('__employer_details_employer_city').value = formData["PAYER CITY"]
        document.getElementById("__employer_details_employer_state").value = formData["PAYER STATE"]
        document.getElementById("__employer_details_employer_zip_code").value = formData["PAYER ZIP"]
        document.getElementById("payers_federal_id").value = "46-4364776"
        document.getElementById('statecode').getElementsByTagName('option')[14].selected = 'selected'

        document.getElementById("description").value = formData["DESCRIPTION"]
        if (formData["DATE ACQUIRED"] !== "N/A") {
            document.getElementById("date_of_acquistion").value = formData["DATE ACQUIRED"]
        }
        if (formData["SALE DATE"] !== "N/A") {
            document.getElementById("date_of_sale").value = formData["SALE DATE"]
        }
        document.getElementById("stocks_bonds").value = formData["SALES PRICE"]
        document.getElementById("costs_other_basic").value = formData["COST BASIS"]
        document.getElementById("wash_sale_loss").value = formData["WASH AMT DISALLOWED"]
        document.getElementById("federal_income_tax").value = formData["FED TAX WITHHELD"]

        if (formData["TERM"] === "SHORT") {
            document.getElementById("sim_gain_or_lost1").click()
        } else {
            document.getElementById("sim_gain_or_lost2").click()
        }
        document.getElementById("sim_reported_irs1").click()
        document.getElementById("reported_gain_or_loss2").click()

        if (formNum < data.length()){
            setTimeout(function(){
                nC()
            }, 1000);
        }
    });
})();