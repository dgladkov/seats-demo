import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Layer, Rect, Stage, Group, Text} from 'react-konva';
import { rotateSector90, rotateSector180, toggleSeatAvailability } from './actions/sector';

const SEAT_SIZE = 50;
const SEAT_SPACING = 10;
const NUMBER_FONT_SIZE = 12;

class App extends Component {
  componentDidMount() {
    this.refs.preview.src = this.refs.canvas.toDataURL();
  }
  componentDidUpdate() {
    this.refs.preview.src = this.refs.canvas.toDataURL();
  }
  render() {
    return (
      <div>
        <button onClick={this.props.rotateSector90}>Rotate 90</button>
        <button onClick={this.props.rotateSector180}>Rotate 180</button>
        <Stage
          width={(SEAT_SIZE + SEAT_SPACING) * this.props.seatsPerRow + SEAT_SPACING}
          height={Math.ceil(this.props.seats.length / this.props.seatsPerRow) * (SEAT_SIZE + SEAT_SPACING) + SEAT_SPACING}>
          <Layer ref="canvas">
            {this.props.seats.map((seat, index) => {
              const row = Math.floor(index / this.props.seatsPerRow);
              const col = index % this.props.seatsPerRow;
              return (
                <Group
                  key={seat.id}
                  x={(SEAT_SIZE + SEAT_SPACING) * col + SEAT_SPACING}
                  y={row * (SEAT_SIZE + SEAT_SPACING) + SEAT_SPACING}
                  onClick={() => this.props.toggleSeatAvailability(seat.id)}
                >
                  <Rect
                    width={SEAT_SIZE}
                    height={SEAT_SIZE}
                    fill={seat.available ? "#00FF00" : "#FF0000"}
                    onClick={this.handleClick}
                  />
                  <Text
                    text={`${seat.row}:${seat.column}`}
                    align="center"
                    width={SEAT_SIZE}
                    y={(SEAT_SIZE / 2) - (NUMBER_FONT_SIZE / 2)}
                  />
                </Group>
              );
            })}
          </Layer>
        </Stage>
        <div>
        </div>
        <div>
          <img ref="preview" style={{ width: '100%'}} />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ sector }) {
  return {
    seats: sector.order.map(id => sector.seats.get(id)),
    seatsPerRow: sector.seatsPerRow,
  };
};

const mapDispatchToProps = {
  toggleSeatAvailability,
  rotateSector90,
  rotateSector180,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
