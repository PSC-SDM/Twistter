import React from "react";
import { Node, Field, HandleOutput, NodeParams } from "protoflow";
import { getColor } from ".";
//TODO Get ports from device definition
const ports = [
    { "number": 1, "side": "left", "name": "3V3", "type": "P", "analog": false, "description": "3V3 Power supply", "maxVoltage": 3.3, "rtc": false },
    { "number": 2, "side": "left", "name": "EN", "type": "I", "analog": false, "description": "CHIP_PU, RESET", "maxVoltage": 3.3, "rtc": false },
    { "number": 3, "side": "left", "name": "36", "type": "I", "analog": true, "description": "GPIO36, ADC1_CH0, S_VP", "maxVoltage": 3.3, "rtc": true },
    { "number": 4, "side": "left", "name": "39", "type": "I", "analog": true, "description": "GPIO39, ADC1_CH3, S_VN", "maxVoltage": 3.3, "rtc": true },
    { "number": 5, "side": "left", "name": "34", "type": "I", "analog": true, "description": "GPIO34, ADC1_CH6, VDET_1", "maxVoltage": 3.3, "rtc": true },
    { "number": 6, "side": "left", "name": "35", "type": "I", "analog": true, "description": "GPIO35, ADC1_CH7, VDET_2", "maxVoltage": 3.3, "rtc": true },
    { "number": 7, "side": "left", "name": "32", "type": "IO", "analog": true, "description": "GPIO32, ADC1_CH4, TOUCH_CH9, XTAL_32K_P", "maxVoltage": 3.3, "rtc": true },
    { "number": 8, "side": "left", "name": "33", "type": "IO", "analog": true, "description": "GPIO33, ADC1_CH5, TOUCH_CH8, XTAL_32K_N", "maxVoltage": 3.3, "rtc": true },
    { "number": 9, "side": "left", "name": "25", "type": "IO", "analog": true, "description": "GPIO25, ADC1_CH8, DAC_1", "maxVoltage": 3.3, "rtc": true },
    { "number": 10, "side": "left", "name": "26", "type": "IO", "analog": true, "description": "GPIO26, ADC2_CH9, DAC_2", "maxVoltage": 3.3, "rtc": true },
    { "number": 11, "side": "left", "name": "27", "type": "IO", "analog": true, "description": "GPIO27, ADC2_CH7, TOUCH_CH7", "maxVoltage": 3.3, "rtc": true },
    { "number": 12, "side": "left", "name": "14", "type": "IO", "analog": true, "description": "GPIO14, ADC2_CH6, TOUCH_CH6, MTMS", "maxVoltage": 3.3, "rtc": true },
    { "number": 13, "side": "left", "name": "12", "type": "IO", "analog": true, "description": "GPIO12, ADC2_CH5, TOUCH_CH5, MTDI", "maxVoltage": 3.3, "rtc": true },
    { "number": 14, "side": "left", "name": "GND", "type": "G", "analog": false, "description": "Ground", "maxVoltage": 0, "rtc": false },
    { "number": 15, "side": "left", "name": "13", "type": "IO", "analog": true, "description": "GPIO13, ADC2_CH4, TOUCH_CH4, MTCK", "maxVoltage": 3.3, "rtc": true },
    { "number": 16, "side": "left", "name": "9", "type": "IO", "analog": false, "description": "GPIO9, D2", "maxVoltage": 3.3, "rtc": false },
    { "number": 17, "side": "left", "name": "10", "type": "IO", "analog": false, "description": "GPIO10, D3", "maxVoltage": 3.3, "rtc": false },
    { "number": 18, "side": "left", "name": "11", "type": "IO", "analog": false, "description": "GPIO11, CMD", "maxVoltage": 3.3, "rtc": false },
    { "number": 19, "side": "left", "name": "5V", "type": "P", "analog": false, "description": "5V Power supply", "maxVoltage": 5.0, "rtc": false },
    { "number": 1, "side": "right", "name": "GND", "type": "G", "analog": false, "description": "Ground", "maxVoltage": 0, "rtc": false },
    { "number": 2, "side": "right", "name": "23", "type": "IO", "analog": false, "description": "GPIO23", "maxVoltage": 3.3, "rtc": false },
    { "number": 3, "side": "right", "name": "22", "type": "IO", "analog": false, "description": "GPIO22", "maxVoltage": 3.3, "rtc": false },
    { "number": 4, "side": "right", "name": "TX", "type": "IO", "analog": false, "description": "GPIO1, U0TXD", "maxVoltage": 3.3, "rtc": false },
    { "number": 5, "side": "right", "name": "RX", "type": "IO", "analog": false, "description": "GPIO3, U0RXD", "maxVoltage": 3.3, "rtc": false },
    { "number": 6, "side": "right", "name": "21", "type": "IO", "analog": false, "description": "GPIO21", "maxVoltage": 3.3, "rtc": false },
    { "number": 7, "side": "right", "name": "GND", "type": "GND", "analog": false, "description": "Ground", "maxVoltage": 0, "rtc": false },
    { "number": 8, "side": "right", "name": "19", "type": "IO", "analog": false, "description": "GPIO19", "maxVoltage": 3.3, "rtc": false },
    { "number": 9, "side": "right", "name": "18", "type": "IO", "analog": false, "description": "GPIO18", "maxVoltage": 3.3, "rtc": false },
    { "number": 10, "side": "right", "name": "5", "type": "IO", "analog": false, "description": "GPIO5", "maxVoltage": 3.3, "rtc": false },
    { "number": 11, "side": "right", "name": "17", "type": "IO", "analog": false, "description": "GPIO17", "maxVoltage": 3.3, "rtc": false },
    { "number": 12, "side": "right", "name": "16", "type": "IO", "analog": false, "description": "GPIO16", "maxVoltage": 3.3, "rtc": false },
    { "number": 13, "side": "right", "name": "4", "type": "IO", "analog": true, "description": "GPIO4, ADC2_CH0, TOUCH_CH0", "maxVoltage": 3.3, "rtc": true },
    { "number": 14, "side": "right", "name": "0", "type": "IO", "analog": true, "description": "GPIO0, ADC2_CH1, TOUCH_CH1, Boot", "maxVoltage": 3.3, "rtc": true },
    { "number": 15, "side": "right", "name": "2", "type": "IO", "analog": true, "description": "GPIO2, ADC2_CH2, TOUCH_CH2", "maxVoltage": 3.3, "rtc": true },
    { "number": 16, "side": "right", "name": "15", "type": "IO", "analog": true, "description": "GPIO15, ADC2_CH3, TOUCH_CH3, MTDO", "maxVoltage": 3.3, "rtc": true },
    { "number": 17, "side": "right", "name": "8", "type": "IO", "analog": false, "description": "GPIO8, D1", "maxVoltage": 3.3, "rtc": false },
    { "number": 18, "side": "right", "name": "7", "type": "IO", "analog": false, "description": "GPIO7, D0", "maxVoltage": 3.3, "rtc": false },
    { "number": 19, "side": "right", "name": "CLK", "type": "IO", "analog": false, "description": "GPIO6, CLK", "maxVoltage": 3.3, "rtc": false }
]
const HX711 = ({ node = {}, nodeData = {}, children, color }: any) => {
    const transitionErrorMsg = 'Add units s/ms'
    const nameErrorMsg = 'Reserved name'
    const [name, setName] = React.useState(nodeData['param-1'])
    const nodeParams: Field[] = [
        {
            label: 'Name', static: true, field: 'param-1', type: 'input', onBlur: () => { setName(nodeData['param-1']) },
            error: nodeData['param-1']?.value?.replace(/['"]+/g, '') == 'hx711' ? nameErrorMsg : null
        }, {
            label: 'CLK Pin', static: true, field: 'param-2', type: 'select',
            data: ports.filter(port => port.type.includes('O') && !['EN', '36', '39', 'CLK', 'TX', 'RX'].includes(port.name)).map(port => port.name)
        },
        { label: 'Gain', static: true, field: 'param-3', type: 'input' },
        {
            label: 'Update Interval', static: true, field: 'param-4', type: 'input',
            error: !['s', 'ms'].includes(nodeData['param-4']?.value?.replace(/['"0-9]+/g, '')) ? transitionErrorMsg : null
        }
    ] as Field[]
    return (
        <Node node={node} isPreview={!node.id} title='HX711 Load Cell' color={color} id={node.id} skipCustom={true} disableInput disableOutput>
            <NodeParams id={node.id} params={nodeParams} />
        </Node>
    )
}

export default {
    id: 'HX711',
    type: 'CallExpression',
    category: "sensors",
    keywords: ["analog", "cell","hx711", "load", "bridge", "wheatstone", "device"],
    check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('hx711'),
    getComponent: (node, nodeData, children) => <HX711 color={getColor('HX711')} node={node} nodeData={nodeData} children={children} />,
    getInitialData: () => { return { to: 'hx711', "param-1": { value: "", kind: "StringLiteral" }, "param-2": { value: "", kind: "StringLiteral" }, "param-3": { value: "128", kind: "StringLiteral" }, "param-4": { value: "60s", kind: "StringLiteral" } } }
}
