import { useSelector } from 'react-redux'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { selectDemographicsState } from '../../Stores/analysisSlice'

const LineGraph: React.FC = (props) => {
  let series: Highcharts.SeriesOptionsType[] = []

  // 都道府県別総人口state
  const demographicsState = useSelector(selectDemographicsState)

  let years: string[] = []

  demographicsState.forEach((element) => {
    let population: number[] = []
    element.data.forEach((e) => {
      if(e.year % 10 === 0){
      years.push(e.year.toString())
      population.push(e.value)
      }
    })

    series.push({
      type: 'line',
      name: element.prefecture,
      data: population,
    })
  })

  const options: Highcharts.Options = {
    title: {
      text: '総人口推移',
    },
    xAxis: {
      title: {
        text: '年度',
      },
      categories: years,
    },
    yAxis: {
      title: {
        text: '人口数',
      },
    },
    series:
      series.length === 0
        ? [{ type: 'line', name: '都道府県名', data: [] }]
        : series,
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default LineGraph
