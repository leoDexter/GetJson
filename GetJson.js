(function ($) {
    $.fn.GetJson = function () {
        var container = $(this);
        var ctrls = jQuery.makeArray(container.find("input[type!='submit'][type!='button'][type!='checkbox'][type!='radio'][type!='file'][name],textarea[name],select[name]"));
        var checkboxes = jQuery.makeArray(container.find("input[type='checkbox'][name]:checked"));
        var radios = jQuery.makeArray(container.find("input[type='radio'][name]:checked"));
        var inputs = ctrls.concat(checkboxes, radios);

        var ReturnObj = {};

        $(inputs).each(function ()
        {
            var names = $(this).prop('name').split('.');
            var str = "ReturnObj";
            $(names).each(function ()
            {
                var name = this.toString();
                str += "." + name;
                if (eval(str + " == undefined")) {
                    eval(str + " = {}");
                }
            });

        });

        $(inputs).each(function ()
        {
            var name = $(this).prop('name');

            var type = $(this).attr("type") != undefined ? $(this).attr("type") : $(this).prop("type");

            if (type == "password" || type == "text" || type == "textarea" || type == "hidden")
            {
                if (container.find("*[name='" + name + "']").length > 1 || $(this).attr("lista") != undefined) {
                    //remove o ultimo nome(o identificador) para criar o array
                    var ArrayName = name.lastIndexOf('.') != -1 ? name.substring(0, name.lastIndexOf('.')) : name;
                    //pega o nome do identificador
                    var LastName = name.lastIndexOf('.') != -1 ? name.substring(name.lastIndexOf('.') + 1, name.length) : name;

                    // se for igual a undefined é pq ele não tem o metodo, se não tem o metodo, não é um array , e eu crio o array
                    if (eval("ReturnObj." + ArrayName + ".push == undefined"))
                        eval("ReturnObj." + ArrayName + " = new Array();");
                    var NewObject = {};
                    eval("NewObject." + LastName + " = $(this).val() ;");
                    eval("ReturnObj." + ArrayName + ".push(NewObject);");
                }
                else {
                    if ($(this).attr("SelectedItemAttrId"))
                        eval("ReturnObj." + name + " = $(this).attr('SelectedItemAttrId');")
                    else
                        eval("ReturnObj." + name + " = $(this).val();");
                }
            }
            else
                if (type == "radio" && $(this).prop("checked"))
                {
                    eval("ReturnObj." + name + " = $(this).val();");
                }
                else
                    if (type == "select-one")//
                    {
                        if ($(this).attr("lista") == undefined)
                        {
                            eval("ReturnObj." + name + " = $(this).val();");
                        }
                        else {
                            //remove o ultimo nome(o identificador) para criar o array
                            var ArrayName = name.lastIndexOf('.') != -1 ? name.substring(0, name.lastIndexOf('.')) : name;
                            //pega o nome do identificador
                            var LastName = name.lastIndexOf('.') != -1 ? name.substring(name.lastIndexOf('.') + 1, name.length) : name;

                            // se for igual a undefined é pq ele não tem o metodo, se não tem o metodo, não é um array , e eu crio o array
                            if (eval("ReturnObj." + ArrayName + ".push == undefined"))
                                eval("ReturnObj." + ArrayName + " = new Array();");
                            var NewObject = {};
                            eval("NewObject." + LastName + " = $(this).val() ;");
                            eval("ReturnObj." + ArrayName + ".push(NewObject);");
                        }
                    }
                    else
                        if (type == "select-multiple")
                        {
                            //remove o ultimo nome(o identificador) para criar o array
                            var ArrayName = name.lastIndexOf('.') != -1 ? name.substring(0, name.lastIndexOf('.')) : name;
                            //select multiple ja retorna um array, portanto não é preciso criar o array manualmente como nos outros trechos
                            eval("ReturnObj." + ArrayName + " = $(this).val();");
                        }
                        else
                            if (type == "checkbox")//
                            {
                                if (container.find("input[name='" + name + "']").length == 1 && $(this).attr('lista') == undefined)//
                                {
                                    if ($(this).prop("checked"))
                                        eval("ReturnObj." + name + " = $(this).val();");
                                }
                                else
                                {
                                    //remove o ultimo nome(o identificador) para criar o array
                                    var ArrayName = name.lastIndexOf('.') != -1 ? name.substring(0, name.lastIndexOf('.')) : name;
                                    //pega o nome do identificador
                                    var LastName = name.lastIndexOf('.') != -1 ? name.substring(name.lastIndexOf('.') + 1, name.length) : name;

                                    // se for igual a undefined é pq ele não tem o metodo, se não tem o metodo, não é um array , e eu crio o array
                                    if (eval("ReturnObj." + ArrayName + ".push == undefined"))
                                        eval("ReturnObj." + ArrayName + " = new Array();");
                                    var NewObject = {};
                                    eval("NewObject." + LastName + " = $(this).val() ;");
                                    eval("ReturnObj." + ArrayName + ".push(NewObject);");
                                }
                            }
        });

        return ReturnObj;

    };
})(jQuery);
