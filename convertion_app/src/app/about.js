export default function About() {
    return (
        <section className="bg-white text-black py-10 px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">About Data Format</h1>
                    <div className="w-24 h-1 mx-auto bg-blue-950 mt-4"></div>
                </div>
                <div className="space-y-8">
                    <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-2">CSV</h2>
                        <p className="text-gray-700 leading-relaxed">
                            CSV is a simple file format used to store tabular data, such as spreadsheets or databases.
                            Files in the CSV format can be imported to and exported from programs that store data in tables,
                            such as Microsoft Excel or OpenOffice Calc.
                        </p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-2">JSON</h2>
                        <p className="text-gray-700 leading-relaxed">
                            JSON (JavaScript Object Notation) is a lightweight data interchange format. It is easy for humans to read and write.
                            It is easy for machines to parse and generate. It is based on a subset of the JavaScript ECMA 262 3rd Edition - December 1999.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
