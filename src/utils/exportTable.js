const downloadBlob = (content, type, filename) => {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

const escapeCsv = (value) => `"${String(value).replaceAll('"', '""')}"`;

const escapeHtml = (value) =>
  String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export const exportCsv = (headers, rows, filename) => {
  const lines = [headers, ...rows].map((row) => row.map(escapeCsv).join(","));
  downloadBlob(`\uFEFF${lines.join("\n")}`, "text/csv;charset=utf-8", `${filename}.csv`);
};

export const exportExcel = (headers, rows, filename) => {
  const toRow = (cells, tag) => `<tr>${cells.map((cell) => `<${tag}>${escapeHtml(cell)}</${tag}>`).join("")}</tr>`;
  const table = `<table>${toRow(headers, "th")}${rows.map((row) => toRow(row, "td")).join("")}</table>`;
  const html = `<html><head><meta charset="utf-8" /></head><body>${table}</body></html>`;
  downloadBlob(html, "application/vnd.ms-excel", `${filename}.xls`);
};
