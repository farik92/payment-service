export default function isINNvalid(args) {
  if (args.Value.match(/\D/)) {
    args.IsValid = false;
    return args.IsValid;
  }
  if (args.Value.length != 12 && args.Value.length != 10) {
    args.IsValid = false;
    return args.IsValid;
  }
  if (args.Value.length == 10) {
    var dgt10 = String(
      ((2 * args.Value[0] +
        4 * args.Value[1] +
        10 * args.Value[2] +
        3 * args.Value[3] +
        5 * args.Value[4] +
        9 * args.Value[5] +
        4 * args.Value[6] +
        6 * args.Value[7] +
        8 * args.Value[8]) %
        11) %
        10,
    );
    if (args.Value[9] == dgt10) {
      args.IsValid = true;
      return args.IsValid;
    } else {
      args.IsValid = false;
      return args.IsValid;
    }
  }
  if (args.Value.length == 12) {
    var dgt11 = String(
      ((7 * args.Value[0] +
        2 * args.Value[1] +
        4 * args.Value[2] +
        10 * args.Value[3] +
        3 * args.Value[4] +
        5 * args.Value[5] +
        9 * args.Value[6] +
        4 * args.Value[7] +
        6 * args.Value[8] +
        8 * args.Value[9]) %
        11) %
        10,
    );
    var dgt12 = String(
      ((3 * args.Value[0] +
        7 * args.Value[1] +
        2 * args.Value[2] +
        4 * args.Value[3] +
        10 * args.Value[4] +
        3 * args.Value[5] +
        5 * args.Value[6] +
        9 * args.Value[7] +
        4 * args.Value[8] +
        6 * args.Value[9] +
        8 * args.Value[10]) %
        11) %
        10,
    );
    if (args.Value[10] == dgt11 && args.Value[11] == dgt12) {
      args.IsValid = true;
      return args.IsValid;
    } else {
      args.IsValid = false;
      return args.IsValid;
    }
  }
}
