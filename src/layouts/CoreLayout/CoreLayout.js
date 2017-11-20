import React from 'react'
import IconNav from '../../components/IconNav'

export const CoreLayout = ({ children }) => (
  <div className='with-iconav'>
    <IconNav />
    <div className='container-fluid'>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
