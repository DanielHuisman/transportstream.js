import Packet from './Packet';

export default class PacketTDT extends Packet {
    utc = 0;

    constructor(data) {
        super(data);
    }
};
