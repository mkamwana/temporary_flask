// Use d3 to pull in the data
const url= "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
const dataPromise = d3.json(url);

d3.json(url).then(function(data) {
    console.log(data);
      });
      
    
//Displaying Demographic Data- Ky and Value from meta Data
function updateMetadata(sample){
    d3.json(url).then(function(data) {
        let demo=data.metadata;
        //filter function-----(1)
        let resp=demo.filter(function(sample_resp){return sample_resp.id==sample});
        let data_resp=resp[0];
        //console.log(data_res)
        d3.select("#sample-metadata").html("");
        Object.entries(data_resp).forEach(function([key,value]){
            d3.select("#sample-metadata")
            .append("p").text(`${key}:${value}`);  
        });
    });
}
    
//bar chart 
    function bar_chart(sample){
        d3.json(url).then(function(data) {
            let sampleData=data.samples;
            let resp=sampleData.filter(sample_resp => sample_resp.id==sample)
            let data_resp=resp[0];
            
            //getting otu labels, values and ids
            let otu_ids=data_resp.otu_ids;
            let otu_labels=data_resp.otu_labels;
            let sample_values=data_resp.sample_values;

            //slicing top 10
            let yticks=otu_ids.slice(0,10).map(function(id){
                return `OTU ${id}`
            });
    
            let x_values=sample_values.slice(0,10);
            let text_labels=otu_labels.slice(0,10);
    
            let bar_chart={
                y:yticks.reverse(),
                x:x_values.reverse(),
                text:text_labels.reverse(),
                type:"bar",
                orientation:"h",
                mode:"markers",
                marker:{
                    
                    color:x_values,
                    colorscale:"#3288bd"
                }
            }
    
            let layout={
                margin: { t: 55, r: 25, l: 65, b: 25 },
                title:"Top 10 Belly Button Bacteria"
            };
            var config = {responsive: true}
    
            Plotly.newPlot("bar",[bar_chart],layout,config);
    
        });
    }
    
    
    //Bubble chart 
    function bubble_chart(sample){
        d3.json(url).then(function(data) {
            //getting the data
            let sampleData=data.samples;
            let resp=sampleData.filter(sample_resp => sample_resp.id==sample)
            let data_resp=resp[0];
            
            //getting the otu labels, values and ids
            let otu_ids=data_resp.otu_ids;
            let otu_labels=data_resp.otu_labels;
            let sample_values=data_resp.sample_values;
            
            //defining the properties
            let bubble_chart={
                y:sample_values,
                x:otu_ids,
                text:otu_labels,
                mode:"markers",
                marker:{
                    size:sample_values,
                    color:otu_ids,
                    colorscale:"#FF4F00"
                }
            }

            //layout assignment and properties    
            let layout={
                margin: { t: 55, r: 35, l: 55, b: 65 },
                title:"Bacteria Culture per sample",
                hovermode:"closest",
                xaxis:{title:"OTU ID"},
                yaxis:{title:"Sample Value"},
                
            };
            var config = {responsive: true}
            Plotly.newPlot("bubble",[bubble_chart],layout,config);
    
        });
    }
    
//Gauge chart
function gauge_chart(sample){
    d3.json(url).then(function(data) {
        let metaData=data.metadata;
        let resp=metaData.filter(function(sample_resp){return sample_resp.id==sample});
        //let res=mdata.filter(sample_res => sample_res.id==sample)
        let data_resp=resp[0]['wfreq'];
        console.log(data_resp)
           
        // Gauge chart 
        var Gauge_chart = [
            {
                type: "indicator",
                mode: "gauge+number+delta",
                value: data_resp,
                title: { text: "Belly Button Washing Frequency <br><i>Scrubs per Week</i>", font: { size: 20 } },
                //delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
                gauge: {
                axis: { range: [null, 9], tickwidth: 2, tickcolor: "black" },
                bar: { color: "#ff0000" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "black",
                steps: [
                    { range: [0, 1], color: "#ffdccc" },
                    { range: [1, 2], color: "#ffcab3"},
                    { range: [2, 3], color: "#ffb999" },
                    { range: [3, 4], color: "#ffa780"},
                    { range: [4, 5], color: "#ff9566" },
                    { range: [5, 6], color: "#ff844d"},
                    { range: [6, 7], color: "#ff7233"},
                    { range: [7, 8], color: "#ff6119" },
                    { range: [8, 9], color: "#ff4f00"},
                    ],
                    
                  }
                }
              ];

              var layout = {
                margin: { t: 55, r: 25, l: 25, b: 25 },
              };
              var config = {responsive: true}
              Plotly.newPlot('gauge', Gauge_chart, layout ,config);
       });
}
    
    // Populating the Drop down menu
    function initialize(){
        
        var select=d3.select("#selDataset");
        //fetching the data and assigning it to a variable
        d3.json(url).then(function(data) {
            let sample_names=data.names;
    
            //Assigning sample and properties of drop down options
            sample_names.forEach(function(sample) {
                select.append("option")
                .text(sample)
                .property("value",sample)
            });
            let sample1=sample_names[0];
            updateMetadata(sample1);
            bar_chart(sample1);
            bubble_chart(sample1);
            gauge_chart(sample1);
        });
    
        
    }
    // Function for dashboard updating   
    function optionChanged(item){
        updateMetadata(item);
        bar_chart(item);
        bubble_chart(item);
        gauge_chart(item);
    }
    
    initialize();