import {BufferList, Buffer, Stream, Bitstream} from 'av';

import {PacketSubtitles, SubtitleSegment} from '../packets';
import Parser from './Parser';
import ParserSubtitleSegment from './ParserSubtitleSegment';

// Initialize subtitle segment parser
const parserSegment = new ParserSubtitleSegment();

export const parseSubtitleSegment = (stream) => {
    // Initialize segment
    const segment = new SubtitleSegment();

    // Parse segment header
    segment.type = stream.read(8);
    segment.pageId = stream.read(16);
    segment.length = stream.read(16);

    // Parse segment specific data
    parserSegment.parse(segment, stream);

    return segment;
};

export default class ParserSubtitles extends Parser {
    constructor() {
        super('Subtitles');
    }

    parse(data) {
        // Initialize packet
        const packet = new PacketSubtitles();

        // Initialize bitstream
        const bufferList = new BufferList();
        const buffer = new Buffer(new Uint8Array(data));
        bufferList.append(buffer);
        const stream = new Stream(bufferList);
        const bitStream = new Bitstream(stream);

        // Parse subtitles header
        packet.identifier = bitStream.read(8);
        packet.streamId = bitStream.read(8);

        // Loop over all subtitle segments
        while (bitStream.read(8) === 0x0f) {
            // Parse subtitle segment
            const segment = parseSubtitleSegment(bitStream);
            packet.segments.push(segment);
        }

        // Check if the packet has data remaining, the last byte is always 0xFF
        if (stream.remainingBytes() > 1) {
            console.warn(`Subtitles packet has ${stream.remainingBytes() - 1} bytes left, but the first byte is not 0x0F.`);
        }

        return packet;
    }
};
