/**
 * This work is derived from:
 *  - https://bl.ocks.org/mbostock/4198499
 *  - https://gist.github.com/anbnyc/a83ec925d25871db80e45e04c4233736
 */
function makePaint(selector, callback) {
    const bars = 10;
    let w = window.innerWidth / 2;
    let h = window.innerHeight;

    let svg = d3.select(selector)
        .attr("width", w)
        .attr("height", h);

    let background = svg.append("rect")
        .attr("class","background")
        .attr("width",w)
        .attr("height",h);

    let bands = svg.append("g");
    bands.selectAll("rect.band")
        .data(_.range(bars))
        .enter()
        .append("rect")
        .attr("height",h)
        .attr("width",w/bars)
        .attr("class", "band")
        .attr("x",i=>i*w/bars);

    let line = d3.line()
        .x(d=>d[0])
        .y(d=>d[1]);

    let pathdata = {
        0: [0, 300]
    };
    let path = svg.append("path")
    .attr("class","line");

    background
        .on("mousedown",()=>{
            background
                .on("mousemove",function(d,i){
                    position = Math.round(d3.event.offsetX/(w/bars));
                    pathdata[0] = [0, 400];
                    pathdata[position] = [position*w/bars,d3.mouse(this)[1]];
                    path.datum(_.values(pathdata)).attr("d",line);
                    svg
                        .on("mouseleave",()=>{
                            background
                                .on("mousemove",null)
                                .on("mouseup",null);
                            if (callback) callback(pathdata)
                        });
                })
                .on("mouseup",()=>{
                    background
                        .on("mousemove",null)
                        .on("mouseup",null);
                    if (callback) callback(pathdata)
                })
        });

    show_true = function () {
        let line = d3.line()
            .x(d=>d[0])
            .y(d=>d[1]);

        let pathdata = {
            0: [0, 400],
            1: [225, 280],
            2: [450, 40],
        };
        let path = svg.append("path")
            .attr("class","true-line");
        path.datum(_.values(pathdata)).attr("d", line);

        console.log("hi!");
    }
    return show_true;
}