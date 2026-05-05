import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'


function App() {
 const [ip , setIp] = useState('')
 const [loading , setLoading] = useState(false)
 const [data , setData] = useState(null)
 const [error , setError] = useState('')

 const fetchIpData = async () => {
  if(!ip.trim()) return;
  setLoading(true)
  setData(null)
  setError('')
//  try function to fetch ip data
 try {
  const response = await fetch(`https://ipinfo.io/${ip}/json`)
  if(!response.ok) throw new Error("invalid ip adress")
  const result = await response.json()
    setData(result);
 }
catch (error) {
  setError("invalid ip or network error try again")
}finally {
  setLoading(false)
}

}
  

  return (
    <>
   <div className='dashboard'>
    <h1>IHR IP Address Locator</h1>
    <input type="text"
    value={ip}
    onChange={(e) => setIp(e.target.value)}
    placeholder='Enter IP address'
    onKeyDown={(e) => e.key === 'ENTER' && fetchIpData()}
     />
     <button onClick={fetchIpData}> search </button>
     {loading && <p>loading...</p>}
     {error && <p className='error'>{error}</p>}
     {data && (
      <div className='result'>
        <h4>city: <strong> {data.city}</strong></h4>
        <h4>region<strong> {data.region}</strong></h4>
        <h4>country:<strong> {data.country}</strong></h4>
       <h4>ISP: <strong> {data.org}</strong></h4>
      </div>
     )}
   </div>
    </>
  )
}

export default App
