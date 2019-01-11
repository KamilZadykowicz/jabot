
// GETTING MESSAGE

    $(document).ready(function(){
        setTimeout(function(){
            $(".opener-btn").animate({width: '200px'},100, function(){
                $(".opener-btn-span").text("Masz Wiadomość");
            // $(".opener-btn-span").text("Masz Wiadomość");
            });
        },3000);
    });

// OPEN AND CLOSE CHAT

    $(document).ready(function(){
        $(".opener-btn").click(function(){
            $(".opener-btn").animate({bottom: '-150px'},100);
            $(".myform-wrap").animate({bottom: '20px'},200);
        });
    });

    $(document).ready(function(){
        $(".myform-close").click(function(){
            $(".opener-btn").animate({bottom: '20px'},100);
            $(".myform-wrap").animate({bottom: '-540px'},200);
        });
    });

// SEND MESSAGE

var imie;
var myid=0;
$(document).ready(function(){
    $(".sender-btn").click(function(){
        myid=1;
        var question1 = $("#question").val();
        if(question1 ==""){return false;}
        imie = $("#imie").val();
        if(imie ==""){return false;}
        console.log(imie);
        $(".myinput").css("display", "none");
        $(".myform-description").css("display", "none");
        $(".myform-answer").css("display", "block");
        $("#question-1").text(question1);
        $("#question").val("");
        $(".sender-btn").css("display", "none");
        $(".magic").css("display", "none");
        $(".sender-btn-2").css("display", "block");
        $(".answer-gif").animate({opacity: '.0.95'},4000, function(){
            $(".answer-gif").css("display", "none");
            $("#answer-1").text("Witaj "+imie+", ja mam na imię Jabot i jestem wirtualnym botem");
        });
        // $(".form-search").animate({top: '-100px'},500,  function(){
        //     $(".form-search").removeAttr('style');
        //     searchvisible = false;
        //     console.log(searchvisible);
        // });
    });

// ANSWERS
    var answers =['Jestem narazie słaby, mam nadzieję że zostanę ulepszony.',
    'Obawiam się że nie potrafię odpowiedzieć na to pytanie',
    'Obiecuję że wezmę się za siebię i nauczę się odpowiadać.',
    'Nie znam odpowiedzi na to pytanie',
    'Chciałbym Ci pomóc, ale jestem dopiero w fazie rozwoju i jestem głupiutki.',
    'Hmmm nie będę udawał że wiem...'
];

// SECOND AND ANOTHER MESSAGE
    
    function myFunc() {
        myid ++;
        console.log(myid);
        var question2 = $("#question").val();
        if(question2 == ""){return false;}
        $(".myform-answer").append('<img class="avatar" src="img/avatar.png" alt=""><div id="question-cloud-'+myid+'" class="myform-cloud"><p id="question-'+myid+'" class="usersquestion"></p></div>');
        // $(".myform-answer").scrollTop(2000);
        $(".myform-answer").animate({ scrollTop: 99999 }, 1000);
        $('#question-cloud-'+myid).animate({opacity: '1'},1000, function(){
            $(".myform-answer").append('<img class="avatar" src="img/litwin-circle.png" alt=""><div id="second-answer" class="myform-cloud-answer"><img class="answer-gif" src="img/answer.gif" alt=""><p id="answer-'+myid+'" class="answer-text"></p></div>');
            // $(".myform-answer").scrollTop(2000);
            $(".myform-answer").animate({ scrollTop: 99999 }, 1000);
        });
        $('#question-'+myid).text(question2);
        $("#question").val("");
        $(".answer-gif").animate({opacity: '.0.95'},4000, function(){
            $(".answer-gif").css("display", "none");

            var weather = question2.search("pogod");
            var lubi = question2.search(/lubi/i);
            var slycha = question2.search(/s[l|ł]ycha/i);
            var godzina = question2.search(/godzina/i);
            var jesc = question2.search(/je[s|ś][c|ć]|pizz/i);
            var badWords = /kurw|dziwk|spierda/i;
            var badWordsS = question2.search(badWords);

            // var pytania =
            // {
            //     "dupa": "spierdaaj", "loda": "nie używaj wulgaryzmów "+imie + "!!!"
            // };

            // var pyta = question2.search(pytania);

            if(weather>0) {
                // GET WEATHER
                function getWeather(){
                    var result = null;
                    yourCity="bialystok";
                    $.ajax({
                        async: false,
                        url: "http://api.openweathermap.org/data/2.5/weather?q="+yourCity+"&APPID=085c87fdbf8784f0ad20d15b026f05e9&units=metric",
                        dataType: "json",
                        success: function(data){
                            result = data;
                        }
                    });
                    return result;
                }
                
                
                var weather = getWeather();
                console.log(weather);                             //Developing line
                    var weatherCity = weather.name;
                    var weatherTemp = weather.main.temp;
                    var weatherStatus = weather.weather[0].main;
                    var weatherImg = weather.weather[0].icon;
                    // $(".weather-city").text(weather.name);
                    // $(".weather-date").text(outputDate);
                    // $(".weather-img").attr("src", "http://openweathermap.org/img/w/"+weatherImg+".png");
                    // $(".weather-temp").text(weatherTemp);
                    // $(".weather-pressure").text(weather.main.pressure+"hPa");
                $('#answer-'+myid).text("Pogoda w "+weatherCity+" wynosi "+weatherTemp+" stopni, ciśnienie wynosi "+weather.main.pressure+" hPa");
            }
            else if(slycha>0) {
                $('#answer-'+myid).text("U mnie wszystko dobrze, a co u Ciebie?");
            }
            else if(jesc>0) {
                $('#answer-'+myid).text("Uwielbiam jeść pizze avenue na sosie serowym");
            }
            else if(lubi>0) {
                $('#answer-'+myid).text("Lubię prowadzić konwersację z ciekawymi ludźmi");
            }
            else if(badWordsS>0) {
                $('#answer-'+myid).text("Proszę nie używać brzydkich słów, trochę kultury !");
            }
            // else if(pyta>0) {
            //     $('#answer-'+myid).text(pytania.loda);
            // }
            else if(godzina>0) {
                var Today = new Date();
                var hour = Today.getHours();
                var minutes = Today.getMinutes();
                if (hour<10){
                    hour = "0" + hour;
                }
                if (minutes<10){
                    minutes = "0" + minutes;
                }
                $('#answer-'+myid).text("Jest godzina "+hour+":"+minutes+" czasu lokalnego !");
            }
            else {
                $('#answer-'+myid).text(answers[Math.floor(Math.random() * 6)]);
                $(".myform-answer").animate({ scrollTop: 99999 }, 1000);
            }
        });
    }
    $(".sender-btn-2").click(function(){
        myFunc();
    })
    $('#question').on('keypress', function (e) {
        if(e.which === 13){

           //Disable textbox to prevent multiple submit
        //    $(this).attr("disabled", "disabled");
        
           if(myid > 0){
           myFunc();
           }
           //Enable the textbox again if needed.
        //    $(this).removeAttr("disabled");
        }
  });
});
