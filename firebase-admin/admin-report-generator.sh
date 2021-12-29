number=${1:-"0"}
node admin-ansheet-student-exam-scores.js > /tmp/reporte-"${number}".txt && cupsfilter /tmp/reporte-"${number}".txt > ~/Downloads/reporte-"${number}".pdf
