import React from 'react';
import {buildURI, toCSV} from '../core';
import {
   defaultProps as commonDefaultProps,
   propTypes as commonPropTypes} from '../metaProps';

/**
 *
 * @example ../../sample-site/csvlink.example.md
 */
class CSVLink extends React.Component {

  static defaultProps = commonDefaultProps;
  static propTypes = commonPropTypes;

  constructor(props) {
    super(props);
    this.buildURI= this.buildURI.bind(this);
    this.downloadForMS = this.downloadForMS.bind(this);
  }

  buildURI() {
    return buildURI(...arguments);
  }

  downloadForMS(event, data, headers, separator, filename) {
    event.preventDefault();
    let csv = decodeURIComponent(encodeURI(toCSV(data, headers, separator)));
    let blobObject = new Blob([csv], {type: "text/csv;charset=utf-8;"});
    window.navigator.msSaveOrOpenBlob(blobObject, filename);
  }

  render(){
    const {data, headers, separator, filename, children , ...rest} = this.props;

    if(window.Blob && window.navigator.msSaveOrOpenBlob) {
      return (
        <a onClick={(e) => this.downloadForMS(e, data, headers, separator, filename)}
           {...rest}
           href="#">
           {children}
        </a>
      )
    }

    return (
      <a download={filename} {...rest}
         href={this.buildURI(data, headers, separator)}>
        {children}
      </a>
    )
  }
}

export default CSVLink;
