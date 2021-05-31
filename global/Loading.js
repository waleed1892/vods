import React from 'react'
import AdSense from 'react-adsense';


export const Loading = () => {
  return (
    <div className="w-100 d-flex justify-content-center align-items-center" style={{ position: 'fixed', bottom: '0px', height: "70px" }}>
      <div className="spinner-border text-dark" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

<div>

<AdSense.Google
  client='ca-pub-3548998999865028'
  slot='79915789369'
  style={{ display: 'block' }}
  align="center"
  layout='in-article'
  format='fluid'
/></div>

export const PageLoading = () => {
  return (
    <div className="w-100 d-flex justify-content-center align-items-center" style={{ position: "fixed", top: "0px", left: "0px", height: "100vh" }}>
      <div className="spinner-border text-dark" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}
