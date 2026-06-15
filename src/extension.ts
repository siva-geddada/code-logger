import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'extension.logSelectedValue',
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selectedText = editor.document.getText(editor.selection);
        if (selectedText) {
          const configuration = vscode.workspace.getConfiguration('extension');
          const customText = configuration.get<string>('customText') ?? '✌️'; // Default to "✌️" if the setting is not defined

          editor.edit((editBuilder) => {
            const currentPosition = editor.selection.active;
            const currentLine = editor.document.lineAt(currentPosition.line);
            
            // Get the indentation of the current line
            const leadingWhitespace = /^\s*/.exec(currentLine.text)?.[0] || '';
            
            const logStatement = `${leadingWhitespace}console.log('${customText}${selectedText} --->', ${selectedText});\n`;
            
            // Find the end of the statement (look for semicolon)
            let insertLine = currentPosition.line;
            let insertColumn = 0;
            
            for (let i = currentPosition.line; i < editor.document.lineCount; i++) {
              const line = editor.document.lineAt(i);
              const semicolonIndex = line.text.indexOf(';');
              if (semicolonIndex !== -1) {
                insertLine = i;
                insertColumn = line.text.length; // Insert at end of line with semicolon
                break;
              }
            }
            
            // Insert the log statement after the statement ends
            editBuilder.insert(
              new vscode.Position(insertLine, insertColumn),
              `\n${logStatement}`
            );
          });
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}


// This method is called when your extension is deactivated
export function deactivate() {}
