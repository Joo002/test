function d3_korea_map(_mapContainerId){
    let zoom = d3.zoom().on("zoom", zoomed).scaleExtent([1, 10]);

    var projection, path, svg,
        geoJson, features, bounds, center,
        map;
 
    function create( callback){

        var HEIGHT = window.innerHeight;
        var WIDTH = window.innerWidth;
 
        console.log('Map scale', {'height': HEIGHT, 'width': WIDTH});

        projection = d3.geoMercator().translate([(WIDTH * 10 / 2), (HEIGHT * 10 / 2)]);
        path = d3.geoPath().projection(projection);
 


        svg = d3.select(_mapContainerId).append("svg")
            .attr("width", WIDTH)
            .attr("height", HEIGHT)
            .style("background", "#A6D7E9")
            .call(zoom)
            .on("dblclick.zoom", null);

        map = svg.append( "g").attr( "id", "map");
        map.attr("transform", "translate(0, 0) scale(" + 0.1 + ")");
 
        d3.json("https://raw.githubusercontent.com/Joo002/test/master/SKorea.json").then(function(_data){
            geoJson = topojson.feature(_data, _data.objects["SKorea"]);
            features = geoJson.features;
 
            bounds = d3.geoBounds(geoJson);
            center = d3.geoCentroid(geoJson);
 
            var distance = d3.geoDistance(bounds[0], bounds[1]);
            var scale = HEIGHT / distance / Math.sqrt(2) * 10;
 
            projection.scale(scale).center(center);
 
            console.log("center", center);
            console.log("scale", scale);
 
            def = map.append("defs")




            rects = [1, 3, 4, 6],
            circles = [7, 8, 9, 10];
            var img_id = function(d){ return "img_" + d; }
            var img_url = function(d){ return "url(#img_" + d + ")"; }

            


            map.selectAll("path")
                .data(features)
                .enter().append( "path")
                .attr("class", function(d) { console.log(d);
                    return d.properties.code;})
                .attr("d", path)
                .style("fill", function(d) { console.log(d);
                    return "url(#img_" + d.properties.code + ")";})
            callback();

            console.log(map.selectAll("path")._groups[0]);


            def.selectAll("pattern").data(map.selectAll("path")._groups[0])
                .enter()
                .append("pattern")
                .attr("id", function(d) {
                  return "img_" + d.className.baseVal;})
                .attr("width", 1)
                .attr("height", 1)
                .attr("patternUnits", "objectBoundingBox")
                .append("image")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", 1000)
                .attr("height", 1000)
                .attr("xlink:href", function(d) {
                  return "img_" + d.className.baseVal + ".jpg";})


        });
    }





    function zoomed() {
        let {x, y, k} = d3.event.transform;
        map.attr('transform', `translate(${x}, ${y})scale(${k * 0.1})`);
        console.log('transform', `translate(${x}, ${y})scale(${k * 0.1})`);
    }



    create(function(){
    })

}