import React from 'react';
import { mount } from 'enzyme';
import Highcharts from 'highstock-release';
import Navigator from '../../../src/components/Navigator/Navigator';
import { createMockChart } from '../../test-utils';

describe('<Navigator />', function ()  {
  let sandbox;

  beforeEach(function () {
    this.update = sinon.spy();
    this.chart = createMockChart();
    this.getChart = sinon.stub();
    this.getChart.returns(this.chart);

    sandbox = sinon.sandbox.create();
    sandbox.stub(Highcharts, 'Navigator');
    sandbox.stub(Highcharts, 'addEvent');
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('when mounted', function () {
    it('creates a new Highcharts Navigator instance', function () {
      mount(<Navigator update={this.update} getChart={this.getChart} />);
      expect(Highcharts.Navigator).to.have.been.calledWithNew;
      expect(Highcharts.Navigator).to.have.been.calledWith(this.chart);
    });

    it('updates the chart with the passed props', function () {
      mount(<Navigator height={100} maskFill="rgba(1,2,3,0.45)" update={this.update} getChart={this.getChart} />);
      expect(this.update).to.have.been.calledWith({
        navigator: {
          enabled: true,
          height: 100,
          maskFill: 'rgba(1,2,3,0.45)',
          update: this.update
        }
      });
    });
  });

  describe('update', function () {
    it('should use the update method when props change', function () {
      const wrapper = mount(<Navigator update={this.update} getChart={this.getChart} />);
      wrapper.setProps({ maskInside: false });
      expect(this.update).to.have.been.calledWith({
        navigator: {
          maskInside: false
        }
      });
    });
  });

  describe('when unmounted', function () {
    it('should disable the Navigator', function () {
      const wrapper = mount(<Navigator update={this.update} getChart={this.getChart} />);
      wrapper.unmount();
      expect(this.update).to.have.been.calledWith({
        navigator: {
          enabled: false
        }
      })
    });
  });
});
