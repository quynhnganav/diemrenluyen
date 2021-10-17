<?php

namespace App\Exports;

use App\Common\Helper;
use App\Models\DM_LopHoc;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Concerns\WithProperties;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use function Psy\sh;

class DanhGiaTheoLopExports implements
        FromArray, WithCustomStartCell, WithColumnWidths,
        WithStyles, WithProperties, ShouldAutoSize
{
    private $lop, $danhGias, $tongHop, $hocKy;

    public function __construct($danhGias, $tongHop, $lop, $hocKy)
    {
        $this->lop = $lop;
        $this->tongHop = $tongHop;
        $this->hocKy = $hocKy;
        $this->danhGias = $danhGias;
    }

    public function array(): array
    {
        return $this->danhGias;
    }

    public function startCell(): string
    {
        return 'A8';
    }

    public function columnWidths(): array
    {
        return [
            'A' => 10,
            'B' => 30,
            'C' => 16,
            'D' => 20,
            'E' => 20,
            'F' => 20,
            'G' => 20
        ];
    }

    public function styles(Worksheet $sheet)
    {

        $tenHocKy = Helper::hocKyToLaMa($this->hocKy->hocky);
        $conutRow = (count($this->danhGias) + 7);

        $sheet->setTitle("{$this->lop->tenlop}");

        $sheet->mergeCells('A1:C1');
        $sheet->mergeCells('A2:C2');
        $sheet->mergeCells('A3:C3');
        $sheet->mergeCells('D1:G1');
        $sheet->mergeCells('D2:G2');
        $sheet->mergeCells('A4:G4');
        $sheet->mergeCells('A5:G5');
        $sheet->mergeCells('A6:G6');

        $sheet->setCellValue('A1', 'ĐẠI HỌC ĐÀ NẴNG');
        $sheet->setCellValue('A2', "TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN \nVÀ TRUYỀN THÔNG VIỆT - HÀN");
        $sheet->setCellValue('A3', 'KHOA KHOA HỌC MÁY TÍNH');

        $sheet->setCellValue('D1', 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM');
        $sheet->setCellValue('D2', 'Độc lập - Tự do - Hạnh phúc');
        $sheet->setCellValue('A4', 'BẢNG TỔNG HỢP KẾT QUẢ RÈN LUYỆN CỦA SINH VIÊN');
        $sheet->setCellValue('A5', "HỌC KỲ {$tenHocKy} NĂM HỌC {$this->hocKy->nambatdau} - {$this->hocKy->namketthuc}");
        $sheet->setCellValue('A6', "Lớp: {$this->lop->tenlop} {$this->lop->khoaK}");
        $sheet->setCellValue('A7', "STT");
        $sheet->setCellValue('B7', "Họ và");
        $sheet->setCellValue('C7', "Tên");
        $sheet->setCellValue('D7', "Số thẻ sinh viên");
        $sheet->setCellValue('E7', "Điểm rèn luyện");
        $sheet->setCellValue('F7', "Xếp loại kết quả rèn luyện");
        $sheet->setCellValue('G7', "Ghi chú");

        $sheet->getStyle('A1:G300')->applyFromArray([
            'font' => [
                'size'  =>  14,
                'name'  =>  'Times New Roman'
            ],
        ]);
        $sheet->getStyle('A1:G6')->applyFromArray([
            'font' => [
                'size'  =>  13,
                'name'  =>  'Times New Roman'
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
                'wrap' => TRUE
            ],
        ]);
        $sheet->getStyle('A2:G6')->applyFromArray([
            'font' => [
                'bold' => TRUE
            ]
        ]);
        $sheet->getStyle("A7:G{$conutRow}")->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000']
                ]
            ]
        ]);
        $sheet->getStyle('A2')->getAlignment()->setWrapText(true);
        $sheet->getRowDimension(1)->setRowHeight(25);
        $sheet->getRowDimension(2)->setRowHeight(40);
        $sheet->getRowDimension(3)->setRowHeight(25);
        $sheet->getRowDimension(4)->setRowHeight(40);
        $sheet->getRowDimension(5)->setRowHeight(25);
        $sheet->getRowDimension(6)->setRowHeight(25);
        $sheet->getRowDimension(7)->setRowHeight(35);
        for ($i=8; $i<=$conutRow + 8; $i++) {
            $sheet->getRowDimension($i)->setRowHeight(20);
            if ($i <= $conutRow)
                $sheet->setCellValue("F{$i}", "=IF(E{$i}>=90,\"Xuất sắc\",IF(E{$i}>=80,\"Tốt\",IF(E{$i}>=65,\"Khá\",IF(E{$i}>=50,\"Trung bình\",\"Yếu\"))))");
        }

        $sheet->mergeCells("A".($conutRow + 1).":G".($conutRow+1));
        $sheet->setCellValue("A".($conutRow+1), "=CONCATENATE(\"(Tổng cộng danh sách có: \", COUNT(E8:E{$conutRow}), \" sinh viên được đánh giá kết quả rèn luyện)\")");

        $sheet->mergeCells("A".($conutRow + 2).":B".($conutRow+2));
        $sheet->setCellValue("A".($conutRow+2), "Trong đó:");
        $sheet->setCellValue("B".($conutRow+3), "Xếp loại");
        $sheet->setCellValue("C".($conutRow+3), "Số lượng sinh viên");
        $sheet->setCellValue("D".($conutRow+3), " Chiếm tỷ lệ %");
        $sheet->getRowDimension($conutRow + 3)->setRowHeight(35);



        $sheet->setCellValue("B".($conutRow+4), "Loại xuất sắc có");
        $sheet->setCellValue("B".($conutRow+4), "Loại xuất sắc có");
        $sheet->setCellValue("B".($conutRow+5), "Loại tốt có");
        $sheet->setCellValue("B".($conutRow+5), "Loại tốt có");
        $sheet->setCellValue("B".($conutRow+6), "Loại khá có");
        $sheet->setCellValue("B".($conutRow+6), "Loại khá có");
        $sheet->setCellValue("B".($conutRow+7), "Loại trung bình có");
        $sheet->setCellValue("B".($conutRow+7), "Loại trung bình có");
        $sheet->setCellValue("B".($conutRow+8), "Loại yếu có");
        $sheet->setCellValue("B".($conutRow+8), "Loại yếu có");

        $sheet->getStyle("B".($conutRow + 3).":D".($conutRow+8))->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000']
                ]
            ]
        ]);

        $sheet->getStyle("B".($conutRow + 3).":D".($conutRow+3))->applyFromArray([
            'font' => [
                'size'  =>  14,
                'name'  =>  'Times New Roman',
                'bold' => TRUE
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
                'wrapText' => TRUE
            ]
        ]);

        return [
            'A2' => ['alignment' => ['wrapText' => true]],
            'D7' => ['alignment' => ['wrapText' => true]],
            'E7' => ['alignment' => ['wrapText' => true]],
            'F7' => ['alignment' => ['wrapText' => true]],
            'A7:G7' => [
                'font' => [
                    'bold' => TRUE
                ],
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                    'vertical' => Alignment::VERTICAL_CENTER,
                    'wrapText' => TRUE
                ]
            ],
            "D8:G{$conutRow}" => ['alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
                'wrap' => TRUE
            ]],
            "A8:A{$conutRow}" => ['alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
                'wrap' => TRUE
            ]],
            "A8:G{$conutRow}" => ['alignment' => [
                'vertical' => Alignment::VERTICAL_CENTER,
                'wrap' => TRUE
            ]],
            'D1' => [
                'font' => [
                    'bold' => TRUE
                ]
            ],
            'D2' => [
                'font' => [
                    'underline' => TRUE
                ]
            ],
            'A4:A5' => [
                'font' => [
                    'size' => 16
                ]
            ],
            'A6' => [
                'font' => [
                    'size' => 14
                ]
            ],
        ];
    }

    public function properties(): array
    {
        return [
            'creator' => "Mai Văn Quang",
            'lastModifiedBy' => 'Mai Văn Quang',
            'title'          => 'Điểm rèn luyện VKU',
            'description'    => "Báo cáo điểm rèn luyện học kỳ {$this->hocKy->hocky} năm học {$this->hocKy->nambatdau} - {$this->hocKy->namketthuc}",
            'subject'        => 'Điểm rèn luyện ',
            'keywords'       => 'vku,drl,baccao',
            'company'        => 'VKU',
        ];
    }

}
