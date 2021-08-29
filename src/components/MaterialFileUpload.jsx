import React from "react";
import Dropzone from "react-dropzone";
import { Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CloudUpload from "@material-ui/icons/CloudUpload";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "black",
        textAlign: "center",
        cursor: "pointer",
        color: "#AAFF00",
        padding: "10px",
        borderColor: "#AAFF00",
        borderStyle: "dashed",
    },
    icon: {
        marginTop: "16px",
        color: "#AAFF00",
        fontSize: "30px",
        fontWeight: "bold",
    },
}));

export const MaterialFileInput = ({ control, name, text, disabled }) => {
    const styles = useStyles();

    return (
        <div>

            <Controller
                control={control}
                name={name}
                defaultValue={[]}
                render={({ field }) => (
                    <>
                        <Dropzone multiple={false} onDrop={field.onChange} accept=".xlsx">
                            {({ getRootProps, getInputProps }) => (
                                <Paper
                                    variant="outlined"
                                    className={styles.root}
                                    {...getRootProps()}
                                >
                                    <CloudUpload className={styles.icon} />
                                    <input {...getInputProps()} name={name} onBlur={field.onBlur} disabled={disabled} />
                                    <p>{text}</p>
                                </Paper>
                            )}
                        </Dropzone>
                        <List>
                            {field.value && field.value.map((f, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        <InsertDriveFile />
                                    </ListItemIcon>
                                    <ListItemText primary={f.name} secondary={f.size} />
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
            />

        </div>
    );
};