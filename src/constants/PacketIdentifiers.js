// Reference: https://www.dvb.org/resources/public/standards/a38_dvb-si_specification.pdf

export const NULL_PACKET = 8191;

export const PACKET_IDENTIFIERS = {
    0: ['PAT'],
    1: ['CAT'],
    2: ['TSDT'],
    // 3-15: Reserved for future use
    16: ['NIT', 'ST'],
    17: ['SDT', 'BAT', 'ST'],
    18: ['EIT', 'CIT', 'ST'],
    19: ['RST', 'ST'],
    20: ['TDT', 'TOT', 'ST'],
    21: ['NetworkSync'],
    22: ['RNT'],
    // 23-27: Reserved for future use
    28: ['InbandSignaling'],
    29: ['Measurement'],
    30: ['DIT'],
    31: ['SIT'],
    // 32-8190: May be assigned as needed to Program Map Tables (PMT), elementary streams and other data tables.
    8191: ['NULL']
};

export const REVERSE_PACKET_IDENTIFIERS = {
    PAT: 0,
    CAT: 1,
    TSDT: 2,
    NIT: 16,
    SDT: 17,
    BAT: 17,
    EIT: 18,
    CIT: 18,
    RST: 19,
    TDT: 20,
    TOT: 20,
    NetworkSync: 21,
    RNT: 22,
    InbandSignaling: 28,
    Measurement: 29,
    DIT: 30,
    SIT: 31,
    NULL: 8191
};
