(function($) {
    
    $(document).ready(function() {

        $.fn.nthParent = function (n) {
            var div = this;
            for (var i = 0; i < n; i++)
                div = div.parent();
            return div;
        };

        /* Show password */
        $(".passwordShow").click(function() { 
            if($(this).siblings(".passwordField").attr("type") === "password") {
                $(this).siblings(".passwordField").attr("type","text");
                $(this).text("Hide");
            } else {
                $(this).siblings(".passwordField").attr("type","password");
                $(this).text("Show");
            }
        });

        /* Format Phone Number */
        $("#phoneNumber").on("keyup keydown",function(event) {
            var keyCode = event.keyCode || event.which;

            /*if (keyCode!=8 && (keyCode < 48 || keyCode > 57)) {
                var length = $(this).val().length-1;
                $(this).val($(this).val().substring(0,length));
            }else */
            if(keyCode!=8 ){
                if($(this).val().length==4 || $(this).val().length==8) {
                    $(this).val($(this).val()+"-");
                }
                if ($(this).val().length > 12) {
                    $(this).val($(this).val().substring(0,12));
                }
            } 
        });
        
        /* OTP lenght Check */
        $(".otpField").on("keyup keydown",function(event) {
            var keyCode = event.keyCode || event.which;
            if(keyCode!=8 ){
                if ($(this).val().length > 6) {
                    $(this).val($(this).val().substring(0,6));
                }
            } 
        });
        
        /* Switch Check */
        $(".switch input").click(function(event) {
            if($(this).nthParent(3).hasClass("active")) {
                $(this).nthParent(3).find(".switchFalse").addClass("colorGreen");
                $(this).nthParent(3).find(".switchTrue").removeClass("colorGreen");
                $(this).nthParent(3).removeClass("active");
            } else {
                $(this).nthParent(3).find(".switchFalse").removeClass("colorGreen");
                $(this).nthParent(3).find(".switchTrue").addClass("colorGreen");
                $(this).nthParent(3).addClass("active");
            }
        });
        
        /* Number Count */
        $(".minnusButton").click(function(event) {
            var num = parseInt($(this).nthParent(1).find(".buttonContent input").val());
            if(num > 0)
                num = num - 1;
            $(this).nthParent(1).find(".buttonContent input").val(num);
        });
        $(".plusButton").click(function(event) {
            var num = parseInt($(this).nthParent(1).find(".buttonContent input").val());
            num = num + 1;
            $(this).nthParent(1).find(".buttonContent input").val(num);
        });
        
        /* greenRadio button click */
        $(".greenRadio input").click(function(event) { 
            if(!$(this).nthParent(1).hasClass("active")) {
                $(".greenRadio.active").removeClass("active");
                $(this).nthParent(1).addClass("active");
            }
        });
        /* grayRadio button click */
        $(".grayRadio input").click(function(event) { 
            if(!$(this).nthParent(1).hasClass("active")) {
                $(".grayRadio.active").removeClass("active");
                $(this).nthParent(1).addClass("active");
            }
        });
        
        /* call datepicker */
        $('#datetimepicker').each(function() {
            var minDate = new Date();
            minDate.setHours(0);
            minDate.setMinutes(0);
            minDate.setSeconds(0,0);

            var today = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
            var endday = new Date(minDate.getFullYear()-80, minDate.getMonth(), minDate.getDate());
            
            var $picker = $(this);
            if($(this).hasClass("dob")) {
                $picker.datepicker({
                    format: "dd M yyyy",
                    todayHighlight: true,
                    startDate: endday,
                    endDate: today,
                    autoclose: true
                });
            } else {
                $picker.datepicker({
                    format: "dd M yyyy",
                    todayHighlight: true,
                    startDate: today,
                    //endDate: end,
                    autoclose: true
                });
            }
            
            var pickerObject = $picker.data('datepicker');
    
            $picker.on('changeDate', function(ev){
                $picker.datepicker('hide');
            });
    
            $picker.datepicker('setDate', today);
    
        });
        
        
        /* File loader */
        $("#fileUploader").click(function() {
            $("#fileUploaderHidden").trigger('click');
        });
        $("#fileUploaderHidden").on('change', function() {
            $(".fileUploaderAdd").removeClass("hidden");
            $(".fileUploaderAdd .textAddon").text($("#fileUploaderHidden").val().substring($("#fileUploaderHidden").val().lastIndexOf("\\")+1));
        });
        $(".fileUploaderAdd a").on('click', function() {
            $(".fileUploaderAdd").addClass("hidden");
            $(".fileUploaderAdd .textAddon").text("");
            $("#fileUploaderHidden").val("");
        });
        
        /* Grid Click */
        var startChosen = false;
        var pathBlocked = false;
        var minSlot = parseInt($(".durationBlock").text()) + 1 ;
                
        $(".gridblock").click(function() {
            $(".toast").addClass("hidden");
            if($(this).hasClass("startBlock")){
                $(this).removeClass("startBlock active currentHover hoverGrid");
                startChosen = false;
                $(".endTime").val("00:00");
                $(".startTime").val("00:00");
                window.startTime = "00:00";
                window.endTime = "00:00";
                $(".hoverGrid").removeClass("hoverGrid");
                $(".hoverDefault").removeClass("hoverDefault");
                $(".endDefault").removeClass("endDefault");
                $(".endBlock").removeClass("endBlock active");
            } else if ($(this).hasClass("unavailGrid")) {
                if(startChosen){
                    $(".currentHover").removeClass("currentHover");
                    $(".hoverGrid").removeClass("hoverGrid");
                    $(".endDefault").addClass("active");
                    $(".endTime").val($(".endDefault").find("p").text());
                    window.endTime = $(".endDefault").find("p").text();
                }
            } else if(startChosen && !$(this).hasClass("hoverDefault") && !$(this).hasClass("endDefault")) {
                startChosen = false;
                $(".hoverDefault").removeClass("hoverDefault");
                $(".endDefault").removeClass("endDefault");
                $(".endBlock").removeClass("endBlock active");
                $(".currentHover").removeClass("currentHover");
                if($(".startBlock").index() > $(this).index() || pathBlocked) {
                    startChosen = true;
                    pathBlocked = false;
                    $(".hoverGrid").removeClass("hoverGrid");
                    $(".hoverDefault").removeClass("hoverDefault");
                    $(".endDefault").removeClass("endDefault");
                    $(".endBlock").removeClass("endBlock active");
                    $(".startBlock").removeClass("startBlock active");

                    $(this).addClass("startBlock hoverGrid active");
                    for(var x=1; x <= minSlot; x++) {
                        if($(".gridblock:nth-child("+($(".startBlock").index()+x)+")").hasClass("unavailGrid")) {
                            $(this).removeClass("startBlock hoverGrid hoverDefault active");
                            $(".hoverGrid").removeClass("hoverGrid hoverDefault");
                            $(".toast").removeClass("hidden");
                            $(".endTime").val("00:00");
                            $(".startTime").val("00:00");
                            window.startTime = "00:00";
                            window.endTime = "00:00";
                            pathBlocked = true;
                            startChosen = false;
                            break;
                        } else {
                            $(".gridblock:nth-child("+($(".startBlock").index()+x)+")").addClass("hoverGrid hoverDefault");
                        }
                    }
                    if(!pathBlocked) {
                        $(".gridblock:nth-child("+($(".startBlock").index()+minSlot)+")").addClass("endBlock endDefault active").removeClass("hoverGrid hoverDefault");
                        $(".startTime").val($(this).find("p").text());
                        $(".endTime").val($(".endBlock").find("p").text());
                        window.startTime = $(this).find("p").text();
                        window.endTime = $(".endBlock").find("p").text();
                        startChosen = true;
                    } else {
                        pathBlocked = false;
                    }
                } else {
                    startChosen = false;
                    $(".endTime").val($(this).find("p").text());
                    window.endTime = $(this).find("p").text();
                    $(this).addClass("endBlock active").removeClass("hoverGrid").removeClass("endDefault");
                }
            } else if ($(this).hasClass("endDefault") && startChosen) {
                startChosen = false;
                $(".endTime").val($(this).find("p").text());
                window.endTime = $(this).find("p").text();
                $(this).addClass("endBlock active").removeClass("hoverGrid");
            } else {
                startChosen = true;
                $(".hoverGrid").removeClass("hoverGrid");
                $(".hoverDefault").removeClass("hoverDefault");
                $(".endDefault").removeClass("endDefault");
                $(".endBlock").removeClass("endBlock active");
                $(".startBlock").removeClass("startBlock active");

                $(this).addClass("startBlock hoverGrid active");
                for(var x=1; x <= minSlot; x++) {
                    if($(".gridblock:nth-child("+($(".startBlock").index()+x)+")").hasClass("unavailGrid")) {
                        $(this).removeClass("startBlock hoverGrid hoverDefault active");
                        $(".hoverGrid").removeClass("hoverGrid hoverDefault");
                        $(".toast").removeClass("hidden");
                        $(".endTime").val("00:00");
                        $(".startTime").val("00:00");
                        window.startTime = "00:00";
                        window.endTime = "00:00";
                        pathBlocked = true;
                        startChosen = false;
                        break;
                    } else {
                        $(".gridblock:nth-child("+($(".startBlock").index()+x)+")").addClass("hoverGrid hoverDefault");
                    }
                }
                if(!pathBlocked) {
                    $(".gridblock:nth-child("+($(".startBlock").index()+minSlot)+")").addClass("endBlock endDefault active").removeClass("hoverGrid hoverDefault");
                    $(".startTime").val($(this).find("p").text());
                    $(".endTime").val($(".endBlock").find("p").text());
                    window.startTime = $(this).find("p").text();
                    window.endTime = $(".endBlock").find("p").text();
                    startChosen = true;
                } else {
                    pathBlocked = false;
                }
            }
        });
        
        /* Grid Hover */
        $(".gridblock").mouseenter(function(){
            if(startChosen) {
                 if($(this).hasClass("unavailGrid")) {
                    pathBlocked = true;
                    $(".currentHover").removeClass("currentHover");
                    $(".hoverGrid").removeClass("hoverGrid");
                    $(".endDefault").addClass("active");
                    $(".endTime").val($(".endDefault").find("p").text());
                    window.endTime = $(".endDefault").find("p").text();
                } else if($(this).index() > $(".endDefault").index()) {
                    pathBlocked = false;
                    $(".endDefault").removeClass("active");
                    $(".currentHover").removeClass("currentHover");
                    $(this).addClass("currentHover");
                    
                    var sPos= $(".startBlock").index();
                    var cPos = $(".currentHover").index();
                    
                    for(i = sPos+1; i <= cPos; i++) {
                        if($(".gridblock:nth-child("+i+")").hasClass("unavailGrid")) {
                            pathBlocked = true;
                            $(".hoverGrid").removeClass("hoverGrid");
                            $(".currentHover").removeClass("currentHover");
                            $(".endDefault").addClass("active");
                            $(".endTime").val($(".endDefault").find("p").text());
                            window.endTime = $(".endDefault").find("p").text();
                        } else if(!pathBlocked) {
                            $(".gridblock:nth-child("+i+")").addClass("hoverGrid");
                        }
                    }
                    
                    if(pathBlocked){
                        $(".endTime").val($(".endDefault").find("p").text());
                        window.endTime = $(".endDefault").find("p").text();
                    } else if (!$(this).hasClass("startBlock") || !$(this).hasClass("endDefault") || !$(this).hasClass("hoverDefault")){
                        $(".endTime").val($(this).find("p").text());
                        window.endTime = $(this).find("p").text();
                    }
                    
                    $(".hoverGrid").each(function() {
                        if($(this).index() > cPos) {
                            $(this).removeClass("hoverGrid");
                        }
                    });
                } else {
                    $(".endTime").val($(".endDefault").find("p").text());
                    window.endTime = $(".endDefault").find("p").text();
                    $(".currentHover").removeClass("currentHover");
                    $(".hoverGrid").removeClass("hoverGrid");
                    $(".endDefault").addClass("active");
                }
            }
        });
        
        $(".gridContainer").mouseleave(function(){
            if(startChosen){  
                $(".hoverGrid").removeClass("hoverGrid");
                $(".currentHover").removeClass("currentHover");
                $(".endDefault").addClass("active");
                $(".endTime").val($(".endDefault").find("p").text());
                window.endTime = $(".endDefault").find("p").text();
            }
        });
                
        
        /* profile page select items */
        $(".lookingForThis").click(function() {
            $(this).addClass("selected");
        });
        
        /* header location selecter */
        $(".locationBlock").click(function() {
            $(".locationOption").slideToggle(1000);
        });
        
        /* flag for a space */
        $(".flagThumb").click(function(){
            if($(this).hasClass("flagged")){
                $(this).attr("src","images/flag_favourite_unselected.png");
                $(this).removeClass("flagged");
            }else {
                $(this).attr("src","images/flag_favourite_selected.png");
                $(this).addClass("flagged");
            }
        })
       
        /* go to top of the page */
        $(".goTopBox").click(function() {
            $("html, body").animate({scrollTop: 0}, 1000);
        });
        
        /* Short box */
        $(".sortBox div").click(function() {
            if($(this).hasClass("selectedBox")) {
            
            } else {
                $(this).nthParent(1).find(".selectedBox").removeClass("selectedBox");
                $(this).addClass("selectedBox");
            }
        });
        
        /* hourly package click */
        $(".tableBody").click(function() {
            $(this).find(".greenRadio input").click();
        });
        
        
        /* FAQ page accordian */
        $(".qsblock").click(function() {
            $(this).nthParent(1).find(".ansBloack").slideToggle(500);
        });
        
        
        /* Green radio click */
        $(".radioButtonGreen").click(function() {
            if(!$(this).hasClass("active")) {
                $(this).nthParent(1).find("button.active").removeClass("active");    
                $(this).addClass("active");
                $(this).find("input").click();
            }
        });
        
        /* profile page radio$(") click */
        $(".profBlock select").change(function() {
            $(".profBlock").removeClass("employee teacher entrepreneur student freelancer").addClass($(this).val().toLowerCase());
        });
        

    });
    
})(jQuery);