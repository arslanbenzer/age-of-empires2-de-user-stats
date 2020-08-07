import React from 'react';


const Table = ({ matches }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Server</th>
          </tr>
        </thead>
        <tbody>
          { (matches.length > 0) ? matches.map( (droplet, index) => {
             return (
              <tr key={ index }>
                <td>{ droplet.match_id }</td>
                <td>{ droplet.server }</td>
              </tr>
            )
           }) : <tr><td colSpan="5">Loading...</td></tr> }
        </tbody>
      </table>
    );
  }

export default Table