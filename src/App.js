import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Layer, Rect, Stage, Group, Text} from 'react-konva';
import { toggleSeatAvailability } from './actions/seats';

const SEAT_SIZE = 50;
const SEAT_SPACING = 10;
const SEATS_PER_ROW = 100;
const NUMBER_FONT_SIZE = 12;

class App extends Component {
  componentDidMount() {
    this.refs.preview.src = this.refs.svg.toDataURL();
  }
  componentDidUpdate() {
    this.refs.preview.src = this.refs.svg.toDataURL();
  }
  render() {
    return (
      <div>
        <Stage
          width={(SEAT_SIZE + SEAT_SPACING) * SEATS_PER_ROW + SEAT_SPACING}
          height={Math.ceil(this.props.seats.length / SEATS_PER_ROW) * (SEAT_SIZE + SEAT_SPACING) + SEAT_SPACING}>
          <Layer ref="svg">
            {this.props.seats.map((seat, index) => {
              const row = Math.floor(index / SEATS_PER_ROW);
              const col = index % SEATS_PER_ROW;
              return (
                <Group
                  key={index}
                  x={(SEAT_SIZE + SEAT_SPACING) * col + SEAT_SPACING}
                  y={row * (SEAT_SIZE + SEAT_SPACING) + SEAT_SPACING}
                  onClick={() => this.props.toggleSeatAvailability(index)}
                >
                  <Rect
                    width={SEAT_SIZE}
                    height={SEAT_SIZE}
                    fill={seat.available ? "#00FF00" : "#FF0000"}
                    onClick={this.handleClick}
                  />
                  <Text
                    text={`${row + 1}:${col + 1}`}
                    align="center"
                    width={SEAT_SIZE}
                    y={(SEAT_SIZE / 2) - (NUMBER_FONT_SIZE / 2)}
                  />
                </Group>
              );
            })}
          </Layer>
        </Stage>
        <div style={{position: 'fixed', bottom: 0, left: 0}}>
          <img ref="preview" style={{ width: '100%'}} />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100px',
            width: '100px',
            borderWidth: '1px',
            borderColor: '#000000',
            zIndex: 10000,
          }} />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ seats }) {
  return {
    seats,
  };
};

const mapDispatchToProps = {
  toggleSeatAvailability,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
