import jsPDF from 'jspdf';
import 'jspdf-autotable';
import jsonData from './data1.json';

function App() {
  const generatePDF = () => {
    const doc = new jsPDF();

    
    doc.setProperties({
      title: 'User Brokers Report',
      subject: 'User Brokers Data',
      author: 'Your Name',
      keywords: 'user brokers, report',
    });

    
    doc.text('User Brokers Report', 20, 15);

    
    const headers = ['Broker Name', 'Secret', 'Strategy Name', 'Avg Buy Price', 'Profit/Loss'];

    
    const rows = jsonData.data.getuserdata.userbrokers.flatMap(broker => {
      return broker.userstrategys.flatMap(strategy => {
        return strategy.positions.map(position => {
          return [
            broker.name,
            broker.secret,
            strategy.name,
            position.avgBuyPrice,
            position.profitLoss,
          ];
        });
      });
    });

    
    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 20, 
      theme: 'striped', 
    });

    
    doc.save('user_brokers_report.pdf');
  };

  return (
    <div>
      <h1>User Brokers Report</h1>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
}

export default App;
