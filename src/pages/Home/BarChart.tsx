import React from 'react'
import {Bar} from 'react-chartjs-2'


const BarChart = () => {
    return (
    <div>
        <Bar
            data={{
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: 'Impact',
                    data: [12, 19, 3, 5, 2, 3],
                },
                ]
            }}
            height={400}
            width={600}
            options={{ maintainAspectRatio: false, }}
        />
    </div>
    )
}
export default BarChart