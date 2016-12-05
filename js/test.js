$(document).ready(function(){


    var objectHolder;
    var objectHolder2 = [];
    var $sites;
    var $priceFrom;
    var $priceTo;
    var $item;
    var $resulttable = $('.query-results');

    $('#tool-input-form').on('submit', function(e){
        e.preventDefault();

        $sites = $('.sites').val();
        $priceFrom = $('.price-from').val();
        $priceTo = $('.price-to').val();
        $item = $('.item').val();
        $item =  $item.replace(/ /g, '%2B');

        //var values = $(this).serialize();
        //console.log(values);

        $.ajax({
            cache: false,
            async: false,
            type: 'GET',
            url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22https%3A%2F%2F" + $sites + "%2Fsearch.php%3Fq%3D" + $item + "%26cn%3D" + $priceFrom + "%26cl%3D" + $priceTo + "%22%20and%20xpath%3D%27%2F%2Fa%5Bcontains(%40class%2C%22itm_nos%22)%5D%27&format=json&callback=",
            success: function(data) {
                objectHolder = data.query.results.a;
            }

            // Error handler.
            //error: function(xhr, status, error) {
            //    alert(xhr.responseText);
            //    alert(error.responseText);
            //}

        });

        $.each(objectHolder, function (index, valuee) {
            objectHolder2.push({link: valuee.href, title: valuee.title});
        });

        function removeDuplicates(arr, prop) {
            var new_arr = [];
            var lookup = {};

            for (var i in arr) {
                lookup[arr[i][prop]] = arr[i];
            }

            for (i in lookup) {
                new_arr.push(lookup[i]);
            }

            return new_arr;
        }

        var uniqueArray = removeDuplicates(objectHolder2, "link");

        $.each(uniqueArray, function(i,v){
            $resulttable.append('<tr class="row"><td class="cell">'+ v.title +'</td></tr>');
            $resulttable.append('<tr class="row"><td class="cell"><a target="_blank" href="">'+ "Link to the item" +'</a></td></tr>');

            //better to use find etc...but.. :D

            $("a").last().attr("href",'http://' + $sites + v.link);
        });

    });
    $('.clear-btn').on('click', function(){
        $('.query-results').html('');
    });


});






