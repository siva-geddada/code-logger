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
            
            // Insert the log statement on the next line with proper indentation
            editBuilder.insert(
              currentPosition.with(currentPosition.line + 1, 0),
              logStatement
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
