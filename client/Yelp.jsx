import * as React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Yelp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      results: []
    }
    this.searchYelp = this.searchYelp.bind(this);
  }

  searchYelp(e) {
    e.preventDefault();
    axios.post('/yelp', {search: this.state.search}).then((results) => {
      console.log("these are my results", results.data)
      this.setState({results: results.data})
    }).catch((error) => {
      console.log("This is my error", error);
    })
  }

  render() {
    const yelpResults = this.state.results.map((result) => {
      return <p>{result.name}</p>
    });

    return (<div>
      <ReactBootstrap.Form>
        <ReactBootstrap.FormGroup controlId="yelpSearch">
          <ReactBootstrap.InputGroup>
            <ReactBootstrap.InputGroup.Button>
              <ReactBootstrap.Button type="submit" bsStyle="danger" onClick={this.searchYelp}>Yelp It!</ReactBootstrap.Button>
            </ReactBootstrap.InputGroup.Button>
            <ReactBootstrap.FormControl type="text" placeholder="Still don't know what you want?" value={this.state.search} onChange={(e) => this.setState({search: e.target.value})}/>
          </ReactBootstrap.InputGroup>
        </ReactBootstrap.FormGroup>
      </ReactBootstrap.Form>

      <ReactBootstrap.Grid>
        <ReactBootstrap.Row>
          <ReactBootstrap.Col md={6}>
            <ReactBootstrap.Carousel>
              {
                this.state.results.map((result, i) =>
                <ReactBootstrap.Carousel.Item>
                  <img key={i} src={result.image_url} width={720} height={480}/>
                  <ReactBootstrap.Carousel.Caption>
                    <h3>
                      <a href={result.url} style={{
                          color: "white"
                        }}>{result.name}</a>
                    </h3>
                  </ReactBootstrap.Carousel.Caption>
                </ReactBootstrap.Carousel.Item>)
              }
            </ReactBootstrap.Carousel>
          </ReactBootstrap.Col>
        </ReactBootstrap.Row>
      </ReactBootstrap.Grid>
    </div>)
  }
}

export default Yelp
