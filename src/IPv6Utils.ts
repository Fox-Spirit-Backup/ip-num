import {leftPadWithZeroBit} from "./BinaryUtils";
import {hexadecimalStringToBinaryString} from "./HexadecimalUtils";

/**
 * Expands an IPv6 number in abbreviated format into its full form
 *
 * {@see https://en.wikipedia.org/wiki/IPv6_address#Representation} for more on the representation of IPv6 addresses
 *
 * @param {string} ipv6String the abbreviated IPv6 address to expand
 * @returns {string} the expanded IPv6 address
 */
export let expandIPv6Number = (ipv6String:string):string => {
    let expandWithZero = (hexadecimalArray: string[]): string => {
        let paddedArray = hexadecimalArray.map((hexadecimal) => {
            return leftPadWithZeroBit(hexadecimal,4);
        });

        return paddedArray.join(":")
    };

    let expandDoubleColon = (gapCount: number): string => {
        let pads = [];
        for (let count=0; count<gapCount; count++) {
            pads.push("0000");
        }
        return pads.join(":");
    };

    if (ipv6String.includes("::")) {
        let split = ipv6String.split("::");
        let leftPortion = split[0];
        let rightPortion = split[1];

        let leftPortionSplit = leftPortion.split(":").filter(hexadecimal => {return hexadecimal !== ""});
        let rightPortionSplit = rightPortion.split(":").filter(hexadecimal => {return hexadecimal !== ""});
        let doublePortion = expandDoubleColon(8 - (leftPortionSplit.length + rightPortionSplit.length));


        let leftString = expandWithZero(leftPortionSplit);
        if (leftString !== "") {
            leftString += ":";
        }


        let rightString = expandWithZero(rightPortionSplit);
        if (rightString !== "") {
            rightString = ":"+rightString;
        }

        return `${leftString}${doublePortion}${rightString}`;

    } else {
        return expandWithZero(ipv6String.split(":"));
    }
};


/**
 * Collapses an IPv6 number in full format into its abbreviated form
 *
 * {@see https://en.wikipedia.org/wiki/IPv6_address#Representation} for more on the representation of IPv6 addresses
 *
 * @param {string} ipv6String the full form IPv6 number to collapse
 * @returns {string} the collapsed IPv6 number
 */
export let collapseIPv6Number = (ipv6String:string):string => {
    let hexadecimals: string[] = ipv6String.split(":");
    let hexadecimalsWithoutLeadingZeros = hexadecimals.map((hexidecimal) => {
       let withoutLeadingZero = hexidecimal.replace(/^0+/, '');
       if (withoutLeadingZero !== '') {
           return withoutLeadingZero;
       } else {
           return "0";
       }

    });
    let contracted = hexadecimalsWithoutLeadingZeros.join(":").replace(/(^0)?(:0){2,}/, ':');
    if (contracted.slice(-1) === ":") {
        return `${contracted}:`;
    }
    return contracted;
};


/**
 * Converts a given IPv6 number expressed in the hexadecimal string notation into a 16 bit binary number in string
 * @param {string} hexadectetString the IPv6 number
 * @returns {string} the IPv6 number converted to binary string
 */
export let hexadectetNotationToBinaryString = (hexadectetString: string): string => {
    let expand = expandIPv6Number(hexadectetString);
    let hexadecimals = expand.split(":");
    return hexadecimals.reduce((hexadecimalAsString, hexavalue) => {
        return hexadecimalAsString.concat(leftPadWithZeroBit(hexadecimalStringToBinaryString(hexavalue),16));
    }, '');
};