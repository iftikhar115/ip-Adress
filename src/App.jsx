import { useState } from "react"
import { MapContainer , Popup, TileLayer, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"


function App() {

  // states
  const [ip , setIp ] = useState('')
  const [ data , setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error , setError] = useState('')

  const fetchIp_Data = async () => {
    if(!ip.trim()) return;
    setLoading(true)
    setData(null)
    setError('')
    try {
      const response = await fetch(`https://ipinfo.io/${ip}/json`);
    if(!response.ok) throw new Error("failed to fetch data")
      const _data =  await response.json()
    setData(_data)

    }catch (error) {
  setError("network or data ip adress problem please right try again");
    } finally{
      setLoading(false)
    }
  }
  return(
    <>
    <div className="dashboard">
      <h1>IP Address Tracker</h1>
      <input type="text"
      value={ip}
      onChange={(e) => setIp(e.target.value)}
      placeholder="Enter your ip adress"
      onKeyDown={(e) => e.key === "Enter" && fetchIp_Data()}
      />
      <button onClick={fetchIp_Data}> search </button>
      {loading && <p>loading...</p>}
      {error && <p className="error">{error}</p>}
      {data && (
        <div className="results">
          <h4> country: <strong>{data.country}</strong></h4>
          <h4> region: <strong>{data.region}</strong></h4>
          <h4> city: <strong>{data.city}</strong></h4>
          <h4> ISP : <strong>{data.org}</strong></h4>
          {data.loc && (
            <MapContainer center={data.loc.split(",").map(Number)}
            zoom={10}
            style={{height: '300px', width: '100%'}}
            >
          <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          
          />
          <Marker
          position={data.loc.split(',').map(Number)}
          >
            <Popup
            >{data.city}</Popup>
          </Marker>
            </MapContainer>
          )}
        </div>
        
      )}
    </div>
    </>
  )
}

  export default App