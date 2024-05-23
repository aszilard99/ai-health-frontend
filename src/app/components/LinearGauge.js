import { useEffect, useRef, useState, useLayoutEffect } from "react";
import * as d3 from 'd3';
import '../linear-gauge.css'


const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      const updateSize = () => {
        setSize([window.innerWidth, window.innerHeight]);
      };
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  };

export default function LinearGauge({result}) {

    const [width2, height2] = useWindowSize();

    const containerRef = useRef(null);
    var container;
    var width;
    var height;
    var chart_w;
    var resultPos;
    var text_margins;
    var chart_y_pos;
    var tickMark;
    var height = 30;

    useEffect(()=> {
        d3.selectAll('svg').remove();
        container = d3.select(containerRef.current);
        width = parseFloat(container.style("width"));
        var gaugeScale = [
            { "color": "#00CC96", "value": 0.227, "depth": 0, "risk": "no risk"},
            { "color": "#00E7AA", "value": 0.380, "depth": 1,"risk": "low risk"},
            { "color": "#FFAA00", "value": 0.260, "depth": 2,"risk": "somewhat risk"},
            { "color": "#FF0000", "value": 0.133, "depth": 3, "risk": "hight risk"},
        ]
        
        chart_w = containerRef.current.clientWidth;
        resultPos = isNaN(result) ? chart_w * 1 : chart_w * result;
        text_margins = {
            top: chart_y_pos + height + 35,
            right: 10,
            bottom: 0,
            left: 10
        };
        var LF = 30;
        chart_y_pos = 0;

        var scaleValue = gaugeScale.sort((a, b) => parseFloat(a.depth) - parseFloat(b.depth)).map(obj => obj.value);
        var scaleColor = gaugeScale.sort((a, b) => parseFloat(a.depth) - parseFloat(b.depth)).map(obj => obj.color);
        var color = d3.scaleLinear()
            .domain(scaleValue)
            .range(scaleColor);

        var svg = d3.select('#linear-gauge').append("svg").attr("width", '100%').attr("height", '100%').attr('overflow', 'visible');
        var defs = svg.append('defs');

        var linearGradient = defs.append('linearGradient')
            .attr('id', 'linear-gradient')
            .attr('y1', '0%').attr('x1', '0%')
            .attr('y2', '0%').attr('x2', '100%');

        var offset = 0;
        linearGradient.selectAll("stop")
            .data(color.range())
            .enter().append("stop")
            .attr("offset", function(d, i) {
                offset += color.domain()[i];
                console.log(offset - color.domain()[i]);
                return offset;
            })
            .attr("stop-color", function(d) {
                console.log(d);
                return d;
                s
            });

        svg.append("g")
            .append('rect')
            .attr("rx", 6)
            .attr("ry", 6)
            .attr('width', width)
            .attr('height', height)
            .style('fill', 'url(#linear-gradient)');

        //appends High Risk text at the end of the gauge
        /*svg.append("g")
        .append("text")
        .classed("gaugeLabel", true)
        .attr("x", chart_w - 30)
        .attr("y", (height + chart_y_pos) / 1.3) 
        .attr("text-anchor", "end").text(gaugeScale[3].risk);*/

        if (result > 0) {
            tickMark = svg.append("g");
            tickMark.append("line")
                .transition()
                .attr("x1", resultPos / 1.01)
                .attr("y1", chart_y_pos - 3)
                .attr("x2", resultPos / 1.01)
                .attr("y2", height + chart_y_pos + 3)
                .attr("stroke-width", 2)
                .attr("stroke", "black");

            tickMark.append("text")
                .transition()
                .attr("x", resultPos / 1.3)
                .attr("y", (height + chart_y_pos) / 1.3)
                .text(Math.round((result * 100) * 100) / 100 + " %");
        }
        
    });

    return(
        <div>
            <div id="linear-gauge" ref={containerRef}>
            </div>
        </div>
    );
}