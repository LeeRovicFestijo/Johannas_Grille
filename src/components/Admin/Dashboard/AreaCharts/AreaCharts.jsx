import AreaLineChart from "./AreaLineChart"
import AreaProgressChart from "./AreaProgressChart"

const AreaCharts = () => {
  return (
    <section className="content-area-charts">
      <AreaLineChart selectedMonth={1}/>
      <AreaProgressChart />
    </section>
  )
}

export default AreaCharts
