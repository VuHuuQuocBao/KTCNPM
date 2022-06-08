import react from "react";
import Context from "../Store/Context";

import { useContext } from "react";
function Final() {
  const { TAW, setTAW } = useContext(Context);
  const { TBF, setTBF } = useContext(Context);
  const { TCF, setTCF } = useContext(Context);
  const { EF, setEF } = useContext(Context);
  const { P, setP } = useContext(Context);
  const { salary, setSalary } = useContext(Context);
  console.log(TAW);
  console.log(TBF);
  console.log(TCF);
  console.log(EF);
  console.log(P);
  console.log(salary);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>TT</th>
            <th>Hạng mục</th>
            <th>Diễn Giải</th>
            <th>Giá trị</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>I </td>
            <td>Tính điểm trường hợp sử dụng (Use-case)</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>1 </td>
            <td>Điểm Actor (TAW)</td>
            <td></td>
            <td>{TAW}</td>
            <td></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Điểm Use-case (TBF)</td>
            <td></td>
            <td>{TBF}</td>
            <td></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Tính điểm UUCP</td>
            <td></td>
            <td>{TAW + TBF}</td>
            <td></td>
          </tr>
          <tr>
            <td>4</td>
            <td>Hệ số phức tạp về KT-CN (TCF)</td>
            <td></td>
            <td>{TCF}</td>
            <td></td>
          </tr>
          <tr>
            <td>5</td>
            <td>Hệ số phức tạp về môi trường (EF)</td>
            <td></td>
            <td>{EF}</td>
            <td></td>
          </tr>
          <tr>
            <td>6</td>
            <td>Tính điểm AUCP</td>
            <td></td>
            <td>{(TAW + TBF) * TCF * EF}</td>
            <td></td>
          </tr>
          <tr>
            <td>II</td>
            <td>Nội suy thời gian lao động (P)</td>
            <td></td>
            <td>{P}</td>
            <td></td>
          </tr>
          <tr>
            <td>III</td>
            <td>Giá trị nỗ lực thực tế (E)</td>
            <td></td>
            <td>{(TAW + TBF) * TCF * EF * (10 / 6)}</td>
            <td></td>
          </tr>
          <tr>
            <td>IV</td>
            <td>Mức lương lao động bình quân (H)</td>
            <td></td>
            <td>{salary}</td>
            <td></td>
          </tr>
          <tr>
            <td>V </td>
            <td>Giá trị phần mềm nội bộ (G)</td>
            <td></td>
            <td>{1.4 * P * salary * (TAW + TBF) * TCF * EF * (10 / 6)}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Final;
