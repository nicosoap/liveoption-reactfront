/**
 * Created by opichou on 11/2/16.
 */
import React, {Component} from 'react'
import {Radar} from 'react-chartjs-2'


export class UserChart extends Component {
    state={
        label:["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        data: [
            [65, 59, 90, 81, 56, 55, 40],
            [28, 48, 40, 19, 96, 27, 100]
        ]
    }

    chart = () => {
        let datasets = this.state.data.map((e, i) => {
            return (
            {
                label: "dataset" + i,
                backgroundColor: "rgba(179,181,198,0.2)",
                borderColor: "rgba(179,181,198,1)",
                pointBackgroundColor: "rgba(179,181,198,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(179,181,198,1)",
                data: e
            }
            )
        })
        let data = {
            labels: this.state.label,
            datasets
        }
        return data
    }

    render() {
        const data = this.chart()
        return (
            <Radar data={data} />
        )
    }

}
