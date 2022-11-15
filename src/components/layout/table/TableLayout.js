import React from 'react';
import style from "../../../FileLayout.module.css";
import { getThumbnail } from '../../../utils/FileLogos';
import linkImage from "../../../assets/link.png";
import copyImage from "../../../assets/copy.png";
import tickImage from "../../../assets/tick.png";
import { Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell, TableCellLayout, ToggleButton, Button } from '@fluentui/react-components';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FileDownloadAsset, FileTableColumns } from './TableDatas';
import { downloadFile } from '../../../utils/SPFileManager';
import {
  ArrowDownload16Regular,
} from "@fluentui/react-icons";
import { TableCellPreview } from './TableCellPreview';
import { fileDownloadLink } from '../../../utils/constant';
import { DocPreview } from '../grid/drivers/DocPreview';

export default function TableLayout(props) {
    const columns = FileTableColumns;

      const showDownloadLink = (file) => {
        if (file?.[FileDownloadAsset]) {
          return (
          <Button icon={<ArrowDownload16Regular />} onClick={(e) => downloadFile(file[fileDownloadLink])}>
            Download
          </Button>
          );
        }
      };

    let {searchResults, files, loading, handleItemClick, handleLinkShare, openFolder, openBox, isComponentVisible, NextLink, GetData, openBoxRef, textareaRef} = props;

    return (
        <>

        <div className={style.tableContainer}>
        
        <SkeletonTheme
            baseColor="#dcdcdc"
            highlightColor="#f5f5f5"
            borderRadius="0.8rem"
            duration={4}
            height={20}
          >
          <Table arial-label="Default table">
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHeaderCell key={column.columnKey} style={{width: column.width}}>
                    {column.label}
                  </TableHeaderCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <tr>
                  <td>
                    <Skeleton count={3} type="wave" height="35px" />
                  </td>
                  <td>
                    <Skeleton count={3} type="wave" height="35px"/>
                  </td>
                  <td>
                    <Skeleton count={3} type="wave" height="35px"/>
                  </td>
                  <td>
                    <Skeleton count={3} type="wave" height="35px"/>
                  </td>
                  <td>
                    <Skeleton count={3} type="wave" height="35px"/>
                  </td>
                </tr>
              ) : (
                (searchResults?.length > 0 ? searchResults : files).map(
                  (file, index) => (
                      <TableRow
                        key={index}
                        onClick={(e) => handleItemClick(file, e)}
                      >
                        <TableCell>
                          <TableCellLayout>
                            <img
                              src={getThumbnail(file)}
                              alt=""
                              onClick={() => openFolder(file)}
                              width={28}
                              height={28}
                            />
                          </TableCellLayout>
                        </TableCell>
                        <TableCell>
                          <TableCellLayout>
                            <div className="file__name">{file.name}</div>
                          </TableCellLayout>
                        </TableCell>
                        <TableCell>
                          <TableCellLayout>
                            <div className="file__download">
                              {showDownloadLink(file)}
                            </div>
                          </TableCellLayout>
                        </TableCell>
                        <TableCell>
                          <TableCellLayout className={style.horizontalCenter}>
                            {
                              file?.[fileDownloadLink] &&
                                // <TableCellPreview file={file} />
                                <DocPreview file={file} />
                            }
                          </TableCellLayout>
                        </TableCell>
                        <TableCell id="linkSharing">
                          <TableCellLayout id="linkSharing" className={style.horizontalCenter}>
                            <div className={style.linkButton}>
                              <img
                                onClick={() => handleLinkShare(index)}
                                src={linkImage}
                                alt="link"
                                width={20}
                              />
                              <div ref={openBoxRef}>
                                {openBox === index && isComponentVisible && (
                                  <div
                                    className={`${style.linkModalContainer} ${style.active}`}
                                  > 
                                    <div className={style.flex}>
                                      <div className={style.shared}>
                                        <img
                                          src={tickImage}
                                          alt="copy"
                                          width={20}
                                        />
                                        <h4>Share Generated Link</h4>
                                      </div>
                                      <img
                                        src={copyImage}
                                        alt="copy"
                                        onClick={navigator.clipboard.writeText(file?.[FileDownloadAsset])}
                                        width={20} />
                                    </div>
                                    <textarea
                                      ref={textareaRef}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleLinkShare(index, e);
                                      }}
                                      rows={3}
                                      className={style.textArea}
                                      value={
                                        file?.[FileDownloadAsset]
                                      }>
                                    </textarea>
                                  </div>
                                )}
                              </div>
                            </div>
                          </TableCellLayout>
                        </TableCell>
                      </TableRow>
                  )
                )
              )}

              {NextLink
                ? !loading && (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <TableCellLayout style={{ justifyContent: "center" }}>
                          <ToggleButton
                            className="nextlink"
                            onClick={GetData}
                            appearance="success"
                          >
                            Load more
                          </ToggleButton>
                          <style>{`
      .nextlink {    padding-bottom: 8px !important; background-color: #4CAF50; color: white; text-align: center; text-decoration: none; line-height: 1; font-size: 16px; margin: 20px 2px; cursor: pointer; }
    `}</style>
                        </TableCellLayout>
                      </TableCell>
                    </TableRow>
                  )
                : null}
            </TableBody>
          </Table>
        </SkeletonTheme>
      </div>
    </>
  );
};
