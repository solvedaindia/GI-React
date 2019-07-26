import React from 'react';
// import '../../../../public/styles/footerContainer/accordian.scss'

class Accordion extends React.Component {
  constructor() {
    super();
    this._handleClick = this._handleClick.bind(this);
  }

  componentDidMount() {
    this._handleClick();
  }

  _handleClick(e) {
    const acc = this._acc.children;
    for (let i = 0; i < acc.length; i++) {
      const a = acc[i];
      a.onclick = () => a.classList.toggle('active');
    }
    if(e) {
      if (e.target.className !== 'plusIcon') {
        console.log('msksss --- ',acc[0])
        document.getElementById(acc[0].className.split(' ')[0]).classList.add("active");
      }
      
    }
  }

  render() {
    return (
      <div ref={a => (this._acc = a)} onClick={this._handleClick}>
        {' '}
        {this.props.children}{' '}
      </div>
    );
  }
}

export default Accordion;
