'use strict';
import {Validator} from "../src/Validator";
import {IPNumType} from "../src/IPNumType";

describe('Validator: ', () => {
    describe('isValidIPv4CidrNotation ', () => {
        it('validate malformed IPv4', () => {
            expect(Validator.isValidIPv4CidrNotation("123.234.334.23")[0]).toBe(false);
            expect(Validator.isValidIPv4CidrNotation("123.234.334.23")[1][0]).toBe(Validator.invalidIPv4CidrNotationMessage);

            expect(Validator.isValidIPv4CidrNotation("123.234.334.0/")[0]).toBe(false);
            expect(Validator.isValidIPv4CidrNotation("123.234.334.0/")[1][0]).toBe(Validator.invalidIPv4CidrNotationMessage);

            expect(Validator.isValidIPv4CidrNotation("123.234.334.0/8")[0]).toBe(false);
            expect(Validator.isValidIPv4CidrNotation("123.234.334.0/8")[1].some(errorMessage => { return errorMessage === Validator.invalidOctetRangeMessage})).toBe(true);

            expect(Validator.isValidIPv4CidrNotation("10.0.0.0/33")[0]).toBe(false);
            expect(Validator.isValidIPv4CidrNotation("10.0.0.0/33")[1].some(errorMessage => {return errorMessage === Validator.invalidPrefixValueMessage})).toBe(true);

            expect(Validator.isValidIPv4CidrNotation("123.234.334.0/34")[0]).toBe(false);
            expect(Validator.isValidIPv4CidrNotation("123.234.334.0/34")[1].some(errorMessage => { return errorMessage === Validator.invalidOctetRangeMessage})).toBe(true);
            expect(Validator.isValidIPv4CidrNotation("123.234.334.0/34")[1].some(errorMessage => {return errorMessage ===Validator.invalidPrefixValueMessage})).toBe(true);

        });
    });

    describe('isValidPrefixValue', () => {
        it('validate invalid IPNumType', () => {
            expect(Validator.isValidPrefixValue(3, IPNumType.ASN)[0]).toBe(false);
            expect(Validator.isValidPrefixValue(3, IPNumType.ASN)[1].some(errorMessage => {return errorMessage === Validator.invalidInetNumType})).toBe(true);
        });

    })
});