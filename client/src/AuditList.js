import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ServerAPI from './ServerAPI';

class AuditList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      audits: null,
    };
    this.props.server.getAudits()
      .then((audits) => {
        this.setState({ audits });
      })
      .catch((err) => console.log(err));
  }
  
  openAudit(auditId) {
    this.props.history.push('/audits/' + auditId);
  }
  
  removeAudit(auditId) {
    this.props.server.removeAudit(auditId)
      .then(() => this.props.server.getAudits())
      .then((audits) => {
        this.setState({ audits });
      })
      .catch((err) => {
        console.log("Remove audit:");
        console.log(err);
      });
  }
  
  render() {
    let auditsHTML = null;
    if (this.state.audits != null) {
      const sortedAudits = [...this.state.audits]
        .sort((a,b) => b.dateStarted - a.dateStarted);
      auditsHTML = sortedAudits.map(audit => (
        <tr key={audit._id}>
          <td className="code">{audit.initialDomainName}</td>
          <td>{audit.maxDepth}</td>
          <td>{(new Date(audit.dateStarted)).toLocaleString()}</td>
          <td>{audit.nbCheckedURLs}</td>
          <td>{audit.nbViolations}</td>
          <td>
            <button onClick={(e) => this.openAudit(audit._id)}>Open</button>{' '}
            <button onClick={(e) => this.removeAudit(audit._id)}>Remove</button>
          </td>
        </tr>
      ));
    }
    return (
      <>
        <p><Link to="/audits/create" className="nav-link">Start a new audit</Link></p>
        {auditsHTML &&
          <table>
            <caption>Saved Audits</caption>
            <thead>
              <tr>
                <th>Domain</th>
                <th>Max Depth</th>
                <th>Date</th>
                <th>Checked URLs</th>
                <th>Violations</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {auditsHTML}
            </tbody>
          </table>
        }
      </>
    );
  }
  
}

AuditList.propTypes = {
  server: PropTypes.instanceOf(ServerAPI).isRequired,
};

export default AuditList;