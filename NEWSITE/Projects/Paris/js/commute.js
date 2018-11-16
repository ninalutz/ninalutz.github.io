function getCommute(origin, destination, callback) {
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: 'TRANSIT',
    }, function (res, status) {
        var has_transit = res.rows[0].elements[0].status != "ZERO_RESULTS";
        var transit_distance = 0;
        if (has_transit) {
            transit_distance = res.rows[0].elements[0].distance.value;
        }
        // Save biking results
        var biking_distance_in_meters;
        service.getDistanceMatrix({
            origins: [origin],
            destinations: [destination],
            travelMode: 'BICYCLING',
        }, function (res, status) {
            biking_distance_in_meters = res.rows[0].elements[0].distance.value;
            service.getDistanceMatrix({
                origins: [origin],
                destinations: [destination],
                travelMode: 'DRIVING',
            }, function (res, status) {
                var distance_in_meters = res.rows[0].elements[0].distance.value;
                var car = distance_in_meters*0.230577999*0.00220462;  // 371 g/pass-mi
                var bus = transit_distance*0.18582970789*0.00220462;  // 299 g/pass-mi
                var bike = biking_distance_in_meters*0.021*0.00220462;  //21 g/km,
                var YEARLY_MULTIPLIER = 52*5;
                callback({
                    "distance_in_meters": distance_in_meters,
                    "bike_distance_in_meters": biking_distance_in_meters,
                    "car": Math.round(car*10)/10,
                    "car_yearly": Math.floor(car*YEARLY_MULTIPLIER),
                    "bus": Math.floor(bus),
                    "bus_yearly": Math.floor(bus*YEARLY_MULTIPLIER),
                    "bike": Math.floor(bike),
                    "bike_yearly": Math.floor(bike*YEARLY_MULTIPLIER),
                    "pct_saving_if_bus": Math.floor(100*(car - bus)/(car)),
                    "pct_saving_if_bike": Math.floor(100*(car - bike)/car),
                    "has_transit": has_transit,
                    "transit_distance": transit_distance
                })
            });
        });
    })
};
