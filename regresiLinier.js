const { sampel } = require("./sampel");

const data = [
  [18, 26],
  [25, 22],
  [20, 24],
  [22, 20],
  [19, 27],
  [18, 28],
  [24, 24],
  [22, 22],
  [21, 27],
  [23, 22],
];

// 0 = x
// 1 = y
// 2 = x^2
// 3 = y^2
// 4 = xy

class RegresiLinier {
  constructor(sampels) {
    this._sampels = sampels;
    this._sampels_length = sampels.length;
    this._jumlah_a = 0;
    this._jumlah_b = 0;
    this._jumlah_a_kuadrat = 0;
    this._jumlah_b_kuadrat = 0;
    this._jumlah_ab = 0;
    this._konstantaA = 0;
    this._konstantaB = 0;
    this._koefisiensi_korelasi = 0;
  }

  info() {
    console.log({
      sampel: this._sampels,
      panjang_sampels: this._sampels_length,
      jumlah_a: this._jumlah_a,
      jumlah_b: this._jumlah_b,
      jumlah_ab: this._jumlah_ab,
      jumlah_a_kuadrat: this._jumlah_a_kuadrat,
      jumlah_b_kuadrat: this._jumlah_b_kuadrat,
      konstanta_a: this._konstantaA,
      konstanta_b: this._konstantaB,
    });
  }

  get sampels() {
    return this._sampels;
  }

  init() {
    this._sampels.forEach((sampel) => {
      this._jumlah_a = sampel[0] + this._jumlah_a;
    });

    this._sampels.forEach((sampel) => {
      this._jumlah_b = sampel[1] + this._jumlah_b;
    });

    this.setBebasPangkat();
    this.setTerikatPangkat();
    this.setBebasXTerikat();

    setTimeout(() => {
      this._sampels.forEach((sampel) => {
        this._jumlah_a_kuadrat = sampel[2] + this._jumlah_a_kuadrat;
      });

      this._sampels.forEach((sampel) => {
        this._jumlah_b_kuadrat = sampel[3] + this._jumlah_b_kuadrat;
      });

      this._sampels.forEach((sampel) => {
        this._jumlah_ab = sampel[4] + this._jumlah_ab;
      });

      this.setKonstantaA();
      this.setKonstantaB();
    }, 1000);
  }

  setBebasPangkat() {
    this._sampels.forEach((sampel, index) => {
      const bebasPangkat = sampel[0] * sampel[0];
      sampel.push(bebasPangkat);
      this._sampels[index] = sampel;
    });
  }

  setTerikatPangkat() {
    this._sampels.map((sampel, index) => {
      const terikatPangkat = sampel[1] * sampel[1];
      sampel.push(terikatPangkat);
      this._sampels[index] = sampel;
    });
  }

  setBebasXTerikat() {
    this._sampels.forEach((sampel, index) => {
      const bebasPangkat = sampel[0] * sampel[1];
      sampel.push(bebasPangkat);
      this._sampels[index] = sampel;
    });
  }

  setKonstantaA() {
    const konsA =
      (this._jumlah_b * this._jumlah_a_kuadrat -
        this._jumlah_a * this._jumlah_ab) /
      (this._sampels_length * this._jumlah_a_kuadrat -
        this._jumlah_a * this._jumlah_a);
    this._konstantaA = parseFloat(konsA.toFixed(2));
  }

  setKonstantaB() {
    const konsB =
      (this._sampels_length * this._jumlah_ab -
        this._jumlah_a * this._jumlah_b) /
      (this._sampels_length * this._jumlah_a_kuadrat -
        this._jumlah_a * this._jumlah_a);
    this._konstantaB = parseFloat(konsB.toFixed(2));
  }

  regresi_x(valx) {
    const reg = valx - this._konstantaA / this._konstantaB;
    console.log(parseFloat(reg.toFixed(2)));
  }

  regresi_y(valy) {
    const reg = this._konstantaA + this._konstantaB * valy;
    console.log(parseFloat(reg.toFixed(2)));
  }

  koefisien_korelasi() {
    const kon = parseFloat(
      (
        this._sampels_length * this._jumlah_ab -
        this._jumlah_a * this._jumlah_b
      ).toFixed(2)
    );
    const kor = parseFloat(
      Math.sqrt(
        (this._sampels_length * this._jumlah_a_kuadrat -
          this._jumlah_a * this._jumlah_a) *
          (this._sampels_length * this._jumlah_b_kuadrat -
            this._jumlah_b * this._jumlah_b)
      ).toFixed(2)
    );

    const result = parseFloat((kon / kor).toFixed(2));

    console.log(`kon : ${kon} kor : ${kor} res: ${result}`);
  }
}

const regresi = new RegresiLinier(data);
regresi.init();

setTimeout(() => {
  regresi.info();
  regresi.regresi_y(30);
  regresi.koefisien_korelasi();
}, 2000);
