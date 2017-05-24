import React, { Component } from 'react';
import {
  Group,
  Layer,
  Rect,
  Stage,
  Text,
} from 'konva';
import { connect } from 'react-redux';
import { toggleSeatAvailability } from './actions/seats';

const SEAT_SIZE = 50;
const SEAT_SPACING = 10;
const SEATS_PER_ROW = 100;
const NUMBER_FONT_SIZE = 12;

class App extends Component {

  constructor(props) {
    super(props);
    this.drawGroup = this.drawGroup.bind(this);
  }

  componentDidMount() {
    const stage = new Stage({
      width: (SEAT_SIZE + SEAT_SPACING) * SEATS_PER_ROW + SEAT_SPACING,
      height: Math.ceil(this.props.seats.length / SEATS_PER_ROW) * (SEAT_SIZE + SEAT_SPACING) + SEAT_SPACING,
      container: this.refs.container,
    });
    this.layer = new Layer();
    this.layer.on('click', 'Group', (event) => {
      this.props.toggleSeatAvailability(event.currentTarget.index);
    });
    this.props.seats.forEach(this.drawGroup);
    stage.add(this.layer);
    this.refs.preview.src = this.layer.toDataURL();
  }

  componentWillReceiveProps(nextProps) {
    let changed = false;
    this.props.seats.forEach((seat, index) => {
      const nextSeat = nextProps.seats[index];
      if (seat.available !== nextSeat.available) {
        this.layer.children[index].children[0].fill(nextSeat.available ? '#00FF00' : '#FF0000');
        this.layer.children[index].draw();
        changed = true;
      }
    });
    if (changed) {
      this.refs.preview.src = this.layer.toDataURL();
    }
  }

  drawGroup(seat, index) {
    const col = index % SEATS_PER_ROW;
    const row = Math.floor(index / SEATS_PER_ROW);
    const groupX = (SEAT_SIZE + SEAT_SPACING) * col + SEAT_SPACING;
    const groupY = row * (SEAT_SIZE + SEAT_SPACING) + SEAT_SPACING;

    const group = new Group({
      x: groupX,
      y: groupY,
    });
    const rect = new Rect({
      width: SEAT_SIZE,
      height: SEAT_SIZE,
      fill: seat.available ? '#00FF00' : '#FF0000',
    });
    const text = new Text({
      text: `${row + 1}:${col + 1}`,
      align: 'center',
      width: SEAT_SIZE,
      y: (SEAT_SIZE / 2) - (NUMBER_FONT_SIZE / 2),
    });
    group.add(rect);
    group.add(text);
    this.layer.add(group);
  }

  render() {
    return (
      <div>
        <div ref="container" />
        <img ref="preview" style={ {width: '100%' }} />
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
